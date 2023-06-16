<script lang="ts">
	import { modalStore } from "@skeletonlabs/skeleton";
	import Field from "$lib/components/general/Field/Field.svelte";
	import { notification } from "$lib/utils/notifications.js";
	import { superForm } from "sveltekit-superforms/client";
	import type { ModalProps } from "./types.js";

	// Props
	export let parent: any;
	export let props: ModalProps;

	const form = superForm(props.form.data, {
		onSubmit({ data }) {
			if (
				props.form.dataToAppend !== undefined &&
				props.form.dataToAppend.length > 0
			) {
				props.form.dataToAppend.forEach((item: any) => {
					data.append(item.name, item.value);
				});
			}

			console.log("data: ", Object.fromEntries(data as any));

			return new Promise((resolve) => resolve({ data }));
		},
		onResult({ result }) {
			console.log("result: ", result);
		},
		onUpdate({ form, cancel }) {
			console.log("form la onUpdate: ", form);

			if (!form.valid) {
				cancel();
			}
		},
		onUpdated({ form }) {
			console.log("form la onUpdated: ", form);

			if (!form.valid) {
				notification({
					type: "error",
					message: props.form.messages.error
				});
			} else {
				notification({
					type: "success",
					message: props.form.messages.success
				});
				modalStore.close();
			}
		},
		validators: props.form.schema,
		validationMethod: "auto"
	});

	const enhance = form.enhance;

	const formClasses =
		"modal-form border border-surface-500 p-4 space-y-4 rounded-container-token";

	// For debug purposes
	// const debug = form.form;
	// $: console.log("form: ", debug);
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

		<!-- <SuperDebug data={$debug} /> -->

		<form
			id={props.form.id}
			class="{formClasses} wf__form"
			method="POST"
			action="?/{props.form.action}"
			use:enhance
		>
			{#each props.form.fields as field}
				<Field {form} field={field.id} {...field} />
			{/each}
		</form>

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
