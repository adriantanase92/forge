<script lang="ts">
	import type { SelectOptionType } from './types';
	import type { ZodValidation } from 'sveltekit-superforms';
	import { arrayProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: any;

	export let label: string | undefined = undefined;
	export let labelClasses: string | undefined = undefined;
	export let id: string | null = null;
	// Specify the tabindex
	export let tabindex: number = 0;
	export let disabled: boolean | null = null;
	export let readonly: boolean | null = null;
	// Set to `true` to show required icon
	export let isRequired = false;

	export let options: SelectOptionType[] = [];

	const { values }: { values: any } = arrayProxy(form, field);

	$: if ($values === undefined) {
		$values = [];
	}

	$: selectProps = {
		id,
		tabindex,
		readonly: readonly === true ? true : undefined,
		disabled: disabled === true ? true : undefined,
		...$$restProps,
		class: [
			'bg-gallery border-gallery text-base rounded-xl font-secondary text-rhino block w-full ring-0 focus:ring-0 border-2 aria-[invalid]:border-error focus:border-2 focus:border-cobalt',
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

	<select multiple name={field} bind:value={$values} {...selectProps}>
		{#each options as option}
			<option
				value={option.value}
				selected={Array.isArray($values) ? $values.includes(option.value) : false}
			>
				{option.text}
			</option>
		{/each}
	</select>
</div>
