<script lang="ts">
	export let data;

	$: ({ tasks } = data);
	$: console.log("tasks ", tasks);
</script>

<div>
	{#each tasks.items as task}
		<h1>
			<a href="/tasks/{task.id}">{task.title}</a>
		</h1>
	{/each}
</div>
