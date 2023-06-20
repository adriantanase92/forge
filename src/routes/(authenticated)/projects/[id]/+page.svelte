<script lang="ts">
	import type { PageData } from "./$types.js";
	import { IconArrowBack, IconPencil } from "@tabler/icons-svelte";

	export let data: PageData;

	$: ({ project } = data);
	// $: console.log("project: ", project);
</script>

<header class="mb-6 wf__page__header">
	<h2 class="h1 wf__page__title text-primary-500 font-semibold">
		{project.name}
	</h2>
	<div>
		<a
			class="btn btn-sm variant-filled-primary"
			href="/projects/edit/{project.id}"
		>
			<span><IconPencil size={20} /></span>
			<span>Edit Project</span>
		</a>
		<a class="btn btn-sm variant-filled" href="/projects">
			<span><IconArrowBack size={20} /></span>
			<span>Back to projects</span>
		</a>
	</div>
</header>
