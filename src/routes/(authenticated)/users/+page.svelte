<script lang="ts">
	export let data;

	$: ({ users } = data);
	$: console.log("users ", users);
</script>

<div>
	{#each users.items as user}
		<h1>
			<a href="/users/{user.id}">{user.firstName} {user.lastName}</a>
		</h1>
	{/each}
</div>
