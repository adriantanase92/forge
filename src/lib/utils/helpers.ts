import {
	modalStore,
	type ModalComponent,
	type ModalSettings,
	toastStore
} from "@skeletonlabs/skeleton";
import type { SubmitFunction } from "@sveltejs/kit";

export const actionModal = (options: any): void => {
	const c: ModalComponent = {
		ref: options.ref,
		props: options.props ?? null
	};
	const modal: ModalSettings = {
		type: "component",
		component: c,
		title: options.title,
		body: options.body ?? "",
		response: (r: any) => console.log("response:", r)
	};
	modalStore.trigger(modal);
};

export const submitDeleteItem: SubmitFunction = async ({ data, cancel }) => {
	const { name, item } = Object.fromEntries(data as any);

	const modalData = new Promise<boolean>((resolve) => {
		const modal: ModalSettings = {
			type: "confirm",
			title: `Delete ${item}`,
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
						message: `${item} deleted successfully`,
						background: "variant-filled-success"
					});
					await update();
					break;
				case "failure":
					toastStore.trigger({
						message: `${item} not deleted`,
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

export const getRandomInt = (max: number): number => {
	const equation = Math.floor(Math.random() * max);

	return equation !== 0 ? equation : 1;
};

export const getRandomIntFromInterval = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);
