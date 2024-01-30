<script lang="ts">
	import { colors } from '$lib/shared';
	import { SvgIcon } from '../svg';

	export let errorMessage: string | undefined = undefined;

	$: error = errorMessage !== undefined && errorMessage.length > 0 ? errorMessage : null;
</script>

{#if error !== null}
	<div class="flex w-full items-center justify-center {$$props.class}">
		<SvgIcon class="mr-2" name="alert" width="24" height="24" color={colors.error} />
		<span class="text-error font-semibold">{error}</span>
	</div>
{/if}
