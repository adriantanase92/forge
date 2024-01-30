<script lang="ts">
	import type { FormPathLeaves, ZodValidation } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { z, AnyZodObject } from 'zod';

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

	const { value } = formFieldProxy(form, field);

	$: dateInputProps = {
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
				: ''}">{label}</label
		>
	{/if}

	<input type="time" name={field} bind:value={$value} {...dateInputProps} />
</div>
