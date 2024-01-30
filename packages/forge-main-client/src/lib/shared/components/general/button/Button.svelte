<script lang="ts">
	import type { kind, type } from './types';
	import type { iconPlacement } from '../../types';
	import { SvgIcon } from '../svg';
	import { getCssColorClassesFromColor, getCssKindClassesFromKind } from './utils';
	import Loading from '../loading/Loading.svelte';
	import { type color, colors } from '$lib/shared';
	import type { iconName } from '../svg/icons';

	// Specify the id of button
	export let id: string = crypto.randomUUID();

	// Specify the kind of button
	export let kind: kind = 'fill';

	// Specify the text and background color of button
	export let color: color = 'curious';

	// Specify the `type` attribute for the button element
	export let type: type = 'button';

	// Set to `true` to disable the button
	export let disabled = false;

	// Set to `true` to when submit action is triggered and to false when the response arrive
	export let delayed = false;

	// Specify the tabindex
	export let tabindex: number = 0;

	// Specify the icon to render
	export let icon: iconName | undefined = undefined;

	// Specify the width of the icon
	export let iconWidth: string = '30';

	// Specify the height of the icon
	export let iconHeight: string = '30';

	// Specify the color of the icon
	export let iconColor: string = colors.rhino;

	// Specify the placement of icon
	export let iconPlacement: iconPlacement = 'right';

	// Obtain a reference to the HTML element
	export let ref: HTMLElement | null = null;

	$: hasIconOnly = icon ?? false;
	$: buttonProps = {
		id,
		type: !disabled ? undefined : type,
		tabindex,
		disabled: disabled === true ? true : undefined,
		...$$restProps,
		class: [
			kind && getCssKindClassesFromKind(kind),
			color && getCssColorClassesFromColor(color, kind),
			disabled && 'disabled:opacity-75',
			'font-secondary font-medium',
			$$restProps.class
		]
			.filter(Boolean)
			.join(' ')
	};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<button bind:this={ref} {...buttonProps} on:click on:mouseover on:mouseenter on:mouseleave>
	<div
		class={hasIconOnly || delayed
			? 'flex content-center items-center justify-center justify-items-center gap-2'
			: ''}
	>
		{#if hasIconOnly}
			<span class={iconPlacement === 'right' ? 'order-last' : 'order-first'}>
				<SvgIcon name={icon} width={iconWidth} height={iconHeight} color={iconColor} />
			</span>
		{/if}

		<slot />

		{#if delayed}
			<Loading
				width="18"
				height="18"
				color={kind === 'fill' ? colors.white : colors[color]}
			/>
		{/if}
	</div>
</button>
