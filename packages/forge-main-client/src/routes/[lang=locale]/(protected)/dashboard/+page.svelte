<script lang="ts">
	import { page } from '$app/stores';

	$: console.log($page.data.user);
</script>

Dashboard page
