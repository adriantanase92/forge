<script lang="ts">
	export let data;

	$: ({ clients } = data);
	$: console.log("data: ", clients);
</script>

<div>
	{#each clients.items as client}
		<h1>
			<a href="/clients/client/{client.id}"
				>{client.firstName} {client.lastName}</a
			>
		</h1>
	{/each}
</div>
