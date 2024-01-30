<script lang="ts">
	import { clickOutside } from '$lib/shared';

	// Specify the id of the dropdown
	export let id: string = `id-${crypto.randomUUID()}`;
	// Specify the width of the dropdown
	export let width: 'auto' | 'full' | 'fit' | 'sm' | 'md' | 'lg' = 'auto';
	// Specify whether the dropdown is open
	export let open: boolean = false;

	const widths: Record<string, string> = {
		auto: 'w-auto',
		full: 'w-full',
		fit: 'w-fit',
		sm: 'w-28',
		md: 'w-40',
		lg: 'w-96'
	};

	$: dropdownProps = {
		id,
		class: [
			`${widths[width]} top-[124%] absolute left-0 z-10 divide-y divide-gray-100 rounded-lg bg-white shadow`,
			$$restProps.class
		]
			.filter(Boolean)
			.join(' ')
	};
</script>

{#if open}
	<div use:clickOutside on:outclick={() => (open = false)} tabindex="-1" {...dropdownProps}>
		<div class="flex flex-col justify-center">
			<slot />
		</div>
	</div>
{/if}
