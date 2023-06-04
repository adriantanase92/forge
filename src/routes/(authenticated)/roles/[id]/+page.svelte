<script lang="ts">
	export let data;

	$: ({ role } = data);
</script>

<div>
	<h1>{role.name}</h1>
	<a href="/roles">Go back</a>
</div>
