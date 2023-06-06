import {
	modalStore,
	type ModalComponent,
	type ModalSettings
} from "@skeletonlabs/skeleton";

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
