import { toastStore } from "@skeletonlabs/skeleton";

export const notification = (options: {
	message: string;
	type: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error";
}) => {
	return toastStore.trigger({
		message: options.message,
		background: `variant-filled-${options.type}`
	});
};
