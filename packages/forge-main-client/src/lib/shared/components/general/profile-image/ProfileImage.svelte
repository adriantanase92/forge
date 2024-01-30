<script lang="ts">
	import { getNameInitials } from '$lib/shared';

	export let firstName: string = '';
	export let lastName: string = '';
	export let imageUrl: string = '';
</script>

{#if !imageUrl}
	<div
		title="{firstName} {lastName}"
		class="bg-white rounded-full text-center text-sm inline-block font-bold border w-10 h-10 leading-10 border-solid border-rhino"
	>
		{getNameInitials({
			firstName,
			lastName
		})}
	</div>
{/if}
