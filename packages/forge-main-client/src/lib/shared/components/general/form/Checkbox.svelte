<script lang="ts">
	import type { FormPathLeaves, ZodValidation } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';
	import type { z, AnyZodObject } from 'zod';
	import type { Writable } from 'svelte/store';

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
	export let id: string | null = null;
	// Specify the tabindex
	export let tabindex: number = 0;
	export let disabled: boolean | null = null;
	export let readonly: boolean | null = null;

	const { value } = formFieldProxy(form, field);

	$: boolValue = value as Writable<boolean>;
	$: inputProps = {
		id,
		tabindex,
		readonly: readonly === true ? true : undefined,
		disabled: disabled === true ? true : undefined,
		...$$restProps
	};
	$: labelProps = {
		class: [
			'flex items-center cursor-pointer',
			disabled && 'disabled:opacity-75',
			$$restProps.class
		]
			.filter(Boolean)
			.join(' ')
	};
</script>

<div>
	<label for={id} {...labelProps}>
		<input
			name={field}
			type="checkbox"
			class="bg-white border-rhino text-success h-4 w-4 cursor-pointer rounded-sm ring-0 focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent"
			bind:checked={$boolValue}
			{...inputProps}
		/>
		<div class="ml-3"><slot /></div>
	</label>
</div>
