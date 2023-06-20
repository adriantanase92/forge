<script lang="ts">
	import { capitalizeEveryWord } from "$shared/utils/helpers.js";
	import { IconPlus } from "@tabler/icons-svelte";

	export let data;

	$: ({ projects } = data);
	// $: console.log("data ", data);
</script>

<div>
	<header class="mb-6 wf__page__header">
		<h2 class="h1 wf__page__title">Permissions</h2>
		<a
			type="button"
			class="btn btn-sm variant-filled-primary"
			href="/projects/add"
		>
			<span><IconPlus size={20} /></span>
			<span>Add</span>
		</a>
	</header>

	<div class="grid gap-4 grid-cols-3 projects">
		{#each projects.items as project}
			<a class="project" href="/projects/{project.id}">
				{capitalizeEveryWord(project.name)}
				<img
					src={project.imageUrl}
					alt={capitalizeEveryWord(project.name)}
					title={capitalizeEveryWord(project.name)}
				/>
				{project.status}
				{project.client}
				{#each project.labels as label}
					{label}
				{/each}
			</a>
		{/each}
	</div>
</div>
