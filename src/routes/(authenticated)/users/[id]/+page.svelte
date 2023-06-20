<script lang="ts">
	export let data;

	$: ({ user } = data);
</script>

<h1>{user.firstName} {user.lastName}</h1>
