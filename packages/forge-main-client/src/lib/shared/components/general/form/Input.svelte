<script lang="ts">
	import type { iconName } from '$lib/shared/components/general/svg/icons.js';
	import { SvgIcon } from '$lib/shared/components/general/svg/index.js';
	import type { FormPathLeaves, ZodValidation } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { z, AnyZodObject } from 'zod';
	import type { inputType } from './types.js';
	import type { iconPlacement } from '$lib/shared/components/types';

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;

	export let type: inputType = 'text';
	export let label: string | undefined = undefined;
	export let labelClasses: string | undefined = undefined;
	export let id: string | null = null;
	// Specify the tabindex
	export let tabindex: number = 0;
	export let disabled: boolean | null = null;
	export let readonly: boolean | null = null;

	// Set to `true` to show required icon
	export let isRequired = false;

	// Specify the icon you need by providing its name
	export let icon: iconName | undefined = undefined;

	// Specify the width of the icon
	export let iconWidth: string | undefined = undefined;

	// Specify the height of the icon
	export let iconHeight: string | undefined = undefined;

	// Specify the color of the icon
	export let iconColor: string | undefined = undefined;

	// Specify the placement of icon
	export let iconPlacement: iconPlacement = 'right';

	const typeAction = (node: any) => {
		node.type = type;
	};

	const { value } = formFieldProxy(form, field);

	$: hasIconOnly = icon ?? false;
	$: inputProps = {
		id,
		type,
		tabindex,
		readonly: readonly === true ? true : undefined,
		disabled: disabled === true ? true : undefined,
		...$$restProps,
		class: [
			'bg-gallery border-gallery text-base rounded-full font-secondary text-rhino block w-full ring-0 focus:ring-0 border-2 aria-[invalid]:border-error focus:border-2 focus:border-cobalt',
			disabled && 'disabled:opacity-75',
			$$restProps.class
		]
			.filter(Boolean)
			.join(' ')
	};
</script>

<div>
	{#if label !== undefined}
		<label
			for={id}
			class="font-secondary text-rhino mb-2 block w-full text-base {labelClasses
				? labelClasses
				: ''}">{label}{isRequired ? '*' : ''}</label
		>
	{/if}

	<div class="flex content-center items-center">
		<input use:typeAction name={field} bind:value={$value} {...inputProps} />

		{#if hasIconOnly}
			<span class={iconPlacement === 'right' ? 'order-last' : 'order-first'}>
				<SvgIcon name={icon} width={iconWidth} height={iconHeight} color={iconColor} />
			</span>
		{/if}
	</div>
</div>
