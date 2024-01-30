<script lang="ts">
	import type { SelectOptionType } from './types';

	import type { FormPathLeaves, ZodValidation } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { z, AnyZodObject } from 'zod';
	import LL from '$i18n/i18n-svelte';

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;

	export let label: string | undefined = undefined;
	export let labelClasses: string | undefined = undefined;
	export let id: string | null = null;
	// Specify the tabindex
	export let tabindex: number = 0;
	export let disabled: boolean | null = null;
	export let readonly: boolean | null = null;
	// Set to `true` to show required icon
	export let isRequired = false;
	export let withEmptyOption: boolean = false;
	export let emptyOptionText: string = $LL.components.form.placeholders.selectEmptyOptionText();

	export let options: SelectOptionType[] = [];

	const { value } = formFieldProxy(form, field);

	$: selectProps = {
		id,
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

	<select name={field} bind:value={$value} {...selectProps}>
		{#if withEmptyOption}
			<option value="">{emptyOptionText}</option>
		{/if}

		{#each options as option, i}
			<option value={option.value} selected={$value === option.value ? true : undefined}>
				{option.text}
			</option>
		{/each}
	</select>
</div>
