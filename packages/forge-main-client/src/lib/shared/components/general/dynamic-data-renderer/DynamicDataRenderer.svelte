<script lang="ts">
	export let layout: 'grid' | 'list' = 'grid';
	export let gap: string = 'gap-4';
	// grid classes: https://tailwindcss.com/docs/grid-template-columns#class-reference
	export let gridClasses: string = 'grid-cols-3';
</script>

<div
	class="{layout === 'grid' ? `grid ${gridClasses}` : 'flex flex-col'} {gap} {$$restProps.class}"
>
	<slot />
</div>
