<script lang="ts">
	import { colors } from '$lib/shared';
	import SvgIcon from '../svg/SvgIcon.svelte';

	// Specify the width of the loading icon
	export let width: string = '30';
	// Specify the height of the loading icon
	export let height: string = '30';
	// Specify the color of the loading icon
	export let color: string = colors.black;
	// Set to `false` to disable the overlay
	export let withOverlay: boolean = false;
</script>

<div
	class={withOverlay
		? 'bg-rhino-alt fixed bottom-0 left-0 right-0 top-0 z-[100] grid h-full w-full place-items-center opacity-70'
		: ''}
>
	<div class={$$slots.default ? 'flex items-center' : ''}>
		{#key color}
			<SvgIcon name="loading" {width} {height} {color} class={$$props.class} />
		{/key}
		{#if $$slots.default}
			<div class="ml-2"><slot /></div>
		{/if}
	</div>
</div>
