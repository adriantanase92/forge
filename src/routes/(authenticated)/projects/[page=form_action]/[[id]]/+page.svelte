<script lang="ts">
	import type { PageData } from "./$types.js";
	import Field from "$common/components/Form/Field/Field.svelte";
	import { superForm } from "sveltekit-superforms/client";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import { IconArrowBack } from "@tabler/icons-svelte";
	import { crudProjectSchema } from "$features/projects/forms/validations.js";
	import { addEditFields } from "$features/projects/forms/fields.js";
	import Spinner from "$common/components/Spinner.svelte";
	import { page } from "$app/stores";
	import { toastStore } from "@skeletonlabs/skeleton";
	import { goto } from "$app/navigation";
	import { capitalizeEveryWord } from "$common/utils/helpers.js";

	export let data: PageData;

	const form = superForm(data.form, {
		validators: crudProjectSchema,
		validationMethod: "auto",
		onUpdated: ({ form }) => {
			if (form.valid) {
				toastStore.trigger({
					message: "Project created successfully.",
					background: "variant-filled-success"
				});
				goto("/projects");
			}
		}
	});
	const { form: formData, message, enhance, delayed } = form;

	$: ({ clients, pageName } = data);
	$: clientsSelectedOptions = clients.items.map((client: any) => ({
		value: client.id,
		text: `${client.firstName} ${client.lastName}`
	}));
	$: fields = addEditFields(clientsSelectedOptions);
	$: submitButtonText = `${capitalizeEveryWord(pageName)} Project`;
	$: pageTitle =
		$formData.name !== ""
			? `Edit Project - <span class="text-primary-500 font-semibold">${$formData.name}</span>`
			: "Add Project";
	// $: console.log("clients: ", clients);
	// $: console.log("form: ", form);
	// $: console.log("data: ", data);
</script>

<header class="mb-6 wf__page__header">
	<h2 class="h1 wf__page__title">{@html pageTitle}</h2>
	<a class="btn btn-sm variant-filled" href="/projects">
		<span><IconArrowBack size={20} /></span>
		<span>Back to projects</span>
	</a>
</header>

<div class="mb-6">
	<SuperDebug data={$formData} />
</div>

{#if $message}
	<div class:error={$page.status >= 400}>
		{$message}
	</div>
{/if}

<form id="addEditform" class="wf__form" method="POST" use:enhance>
	<input type="hidden" name="id" bind:value={$formData.id} />

	<div class="grid gap-2 grid-cols-3 mb-6">
		{#each fields as field}
			<Field {form} field={field.id} {...field} />
		{/each}
	</div>

	<div class="wf__form__actions flex items-center justify-between">
		<a class="btn variant-filled" href="/projects">
			<span><IconArrowBack size={20} /></span>
			<span>Cancel</span>
		</a>

		<button
			type="submit"
			class="btn variant-filled-primary"
			form="addEditform"
			disabled={$delayed}
		>
			{#if $delayed}<Spinner classes="mr-2" />{/if}
			{submitButtonText}
		</button>
	</div>
</form>
