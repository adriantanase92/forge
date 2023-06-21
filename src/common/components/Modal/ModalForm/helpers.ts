import {
	modalStore,
	type ModalComponent,
	type ModalSettings,
	toastStore
} from "@skeletonlabs/skeleton";
import type { SubmitFunction } from "@sveltejs/kit";
import { capitalizeEveryWord } from "$common/utils/helpers.js";

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
					toastStore.trigger({
						message: `${capitalizeItem} deleted successfully`,
						background: "variant-filled-success"
					});
					await update();
					break;
				case "failure":
					toastStore.trigger({
						message: `${capitalizeItem} not deleted`,
						background: "variant-filled-error"
					});
					await update({ reset: false });
					break;
				default:
					break;
			}
		};
	}
};

export const actionModalForm = (options: any): void => {
	const c: ModalComponent = {
		ref: options.ref,
		props: { props: options.props } ?? null,
		slot: options.slot ?? null
	};
	const modal: ModalSettings = {
		type: "component",
		component: c,
		title: options.title,
		body: options.body ?? "",
		buttonTextCancel: options.buttonTextCancel ?? "Cancel",
		buttonTextConfirm: options.buttonTextConfirm ?? "",
		buttonTextSubmit: options.buttonTextSubmit ?? "",
		response: (r: any) => console.log("response:", r)
	};
	modalStore.trigger(modal);
};
