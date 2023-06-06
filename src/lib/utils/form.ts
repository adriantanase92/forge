import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
import type { SubmitFunction } from "@sveltejs/kit";
import { notification } from "./notifications.js";
import { capitalizeEveryWord } from "./helpers.js";

export const submitDeleteItem: SubmitFunction = async ({ data, cancel }) => {
	const { name, item } = Object.fromEntries(data as any);
	const capitalizeItem = capitalizeEveryWord(item);

	const modalData = new Promise<boolean>((resolve) => {
		const modal: ModalSettings = {
			type: "confirm",
			title: `Delete ${capitalizeItem}`,
			body: `Are you sure you want to delete ${item} <strong class="text-primary-500">${name}</strong>?`,
			response: (r: boolean) => {
				resolve(r);
			}
		};
		modalStore.trigger(modal);
	}).then((r: boolean) => r);

	const userResponse = await modalData;

	if (!userResponse) {
		cancel();
	} else {
		return async ({ result, update }: any) => {
			switch (result.type) {
				case "success":
					notification({
						type: "success",
						message: `${capitalizeItem} deleted successfully`
					});
					await update();
					break;
				case "failure":
					notification({
						type: "error",
						message: `${capitalizeItem} not deleted`
					});
					await update({ reset: false });
					break;
				default:
					break;
			}
		};
	}
};
