<script lang="ts">
	import { colors } from '$lib/shared/';
	import { icons, type iconName } from './icons';

	export let name: iconName = 'default';
	export let color = colors.rhino;
	export let width = '2rem';
	export let height = '2rem';
	export let focusable: string | number | null | undefined = undefined;

	function addColorToSvg(svg: string): string {
		return svg.replaceAll('__color__', color);
	}

	$: displayIcon = icons[name];
</script>

<svg
	class={$$props.class}
	stroke-width={$$props.strokeWidth}
	fill={$$props.fill}
	{focusable}
	{width}
	{height}
	viewBox="0 0 {displayIcon.box}"
	preserveAspectRatio="xMidYMid"
>
	{@html addColorToSvg(displayIcon.svg)}
</svg>
