<script lang="ts">
	import type { PageData } from "./$types.js";
	import Field from "$lib/components/general/Field/Field.svelte";
	import { superForm } from "sveltekit-superforms/client";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import { IconArrowBack } from "@tabler/icons-svelte";
	import { crudProjectSchema } from "$lib/form-schemas/project.js";
	import { addFormFields } from "./form-fields.js";
	import Spinner from "$lib/components/general/Spinner.svelte";
	import { page } from "$app/stores";
	import { toastStore } from "@skeletonlabs/skeleton";
	import { goto } from "$app/navigation";

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

	$: ({ clients } = data);
	// $: console.log("clients: ", clients);
	$: clientsSelectedOptions = clients.items.map((client: any) => ({
		value: client._id,
		text: `${client.firstName} ${client.lastName}`
	}));
	// $: console.log("form: ", form);
</script>

<header class="mb-6 wf__page__header">
	<h2 class="h1 wf__page__title">Add New Project</h2>
	<a class="btn btn-sm variant-filled-primary" href="/projects">
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

<form id="addForm" class="wf__form" method="POST" use:enhance>
	<div class="grid gap-2 grid-cols-3 mb-6">
		{#each addFormFields(clientsSelectedOptions) as field}
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
			form="addForm"
			disabled={$delayed}
		>
			{#if $delayed}<Spinner classes="mr-2" />{/if}
			Create Project
		</button>
	</div>
</form>
