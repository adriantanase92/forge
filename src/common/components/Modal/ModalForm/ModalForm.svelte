<script lang="ts">
	import { modalStore, toastStore } from "@skeletonlabs/skeleton";
	import Field from "$common/components/Form/Field/Field.svelte";
	import { superForm } from "sveltekit-superforms/client";
	import type { ModalProps } from "./types.js";
	import { sfFormOptions } from "./helpers.js";
	import type { SuperValidated } from "sveltekit-superforms";

	// Props
	export let parent: any;
	export let props: ModalProps;

	let form: any = null;
	let enhance: any = null;
	const formOptions = sfFormOptions(props);

	$: if (props.form.action === "create") {
		form = superForm(props.form.data, { ...formOptions });
		enhance = form.enhance;
	} else {
		const validated: SuperValidated<any> = {
			valid: false,
			posted: false,
			data: props.form.data,
			errors: {},
			constraints: {}
		};

		form = superForm(validated, {
			...formOptions
		});
		enhance = form.enhance;
	}

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
