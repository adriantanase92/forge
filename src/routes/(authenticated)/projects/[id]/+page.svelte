<script lang="ts">
	import { enhance } from "$app/forms";
	import { submitDeleteItem } from "$common/components/Modal/ModalForm/helpers.js";
	import type { PageData } from "./$types.js";
	import {
		IconArrowBack,
		IconPencil,
		IconTrashXFilled
	} from "@tabler/icons-svelte";

	export let data: PageData;

	$: ({ project } = data);
	// $: console.log("project: ", project);
</script>

<header class="mb-6 wf__page__header">
	<h2 class="h1 wf__page__title text-primary-500 font-semibold">
		{project.name}
	</h2>
	<div>
		<form
			style="display: inline;"
			method="POST"
			action="?/delete"
			use:enhance={submitDeleteItem}
		>
			<input type="hidden" name="url" hidden value="/projects" />
			<input type="hidden" name="item" hidden value="project" />
			<input type="hidden" name="id" hidden value={project.id} />
			<input type="hidden" name="name" hidden value={project.name} />
			<button type="submit" class="btn btn-sm variant-filled-error">
				<span><IconTrashXFilled size={18} /></span>
				<span>Delete</span>
			</button>
		</form>
		<a
			class="btn btn-sm variant-filled-primary"
			href="/projects/edit/{project.id}"
		>
			<span><IconPencil size={20} /></span>
			<span>Edit</span>
		</a>

		<a class="btn btn-sm variant-filled" href="/projects">
			<span><IconArrowBack size={20} /></span>
			<span>Back to projects</span>
		</a>
	</div>
</header>
