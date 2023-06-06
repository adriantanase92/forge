<script lang="ts">
	import { modalStore } from "@skeletonlabs/skeleton";
	import Form from "./Form.svelte";
	import Field from "./Field/Field.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { notification } from "$lib/utils/notifications.js";

	// Props
	export let parent: any;
	export let props: any;

	const submitFunction: SubmitFunction = async ({ data, cancel }) => {
		if (
			props.form.hasOwnProperty("dataToAppend") &&
			props.form.dataToAppend.length > 0
		) {
			props.form.dataToAppend.forEach((item: any) => {
				data.append(item.name, item.value);
			});
		}

		const { name } = Object.fromEntries(data as any);

		// aici tre verificat ca tot form-ul sa fie valid
		if (typeof name === "string" && name?.length < 2) {
			// validare pt form
			// return fail(400, {
			// 	error: true,
			// 	message: "Name must be at least 2 characters.",
			// 	name
			// });
			cancel();
		} else {
			return async ({ result, update }) => {
				switch (result.type) {
					case "success":
						notification({
							type: "success",
							message: props.form.messages.success
						});
						await update();
						modalStore.close();
						break;
					case "failure":
						notification({
							type: "error",
							message: props.form.messages.error
						});
						await update({ reset: false });
						break;
					default:
						break;
				}
			};
		}
	};
</script>

{#if $modalStore[0]}
	<div
		id={props.modalId}
		class="modal-example-form card p-4 w-modal shadow-xl space-y-4"
	>
		<header class="text-2xl font-bold">
			{$modalStore[0].title ?? "(title missing)"}
		</header>
		<article>{$modalStore[0].body ?? "(body missing)"}</article>

		<Form id={props.form.id} action={props.form.action} {submitFunction}>
			{#each props.form.fields as field}
				<Field {...field} />
			{/each}
		</Form>

		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
				{parent.buttonTextCancel}
			</button>
			<button
				type="submit"
				class="btn variant-filled-primary {parent.buttonPositive}"
				form={props.form.id}
			>
				{parent.buttonTextSubmit}
			</button>
		</footer>
	</div>
{/if}
