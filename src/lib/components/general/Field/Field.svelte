<script lang="ts">
	import type { FormPathLeaves, ZodValidation } from "sveltekit-superforms";
	import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";
	import type { Writable } from "svelte/store";
	import type { z, AnyZodObject } from "zod";
	import { dateProxy } from "sveltekit-superforms/client";
	import type { kind, type, selectOption } from "./types.js";

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<ZodValidation<T>, never>;
	export let field: FormPathLeaves<z.infer<T>>;
	export let kind: kind = "input";
	export let type: type = "text";
	export let label: string;
	export let id: string | null = null;
	export let classes: string = "";
	export let selectOptions: selectOption[] | null = null;
	export let disabled: boolean | null = null;
	export let readonly: boolean | null = null;
	export let multiple: boolean | null = null;

	const typeAction = (node: any) => {
		node.type = type;
	};

	const fieldProxy = formFieldProxy(form, field);
	const { errors, value } = fieldProxy;

	let proxy: Writable<string> | undefined;

	if (type === "date") {
		proxy = dateProxy(form.form, field, {
			format: "date"
		});
	} else if (type === "datetime-local") {
		proxy = dateProxy(form.form, field, {
			format: "datetime"
		});
	}

	$: boolValue = value as Writable<boolean>;

	// export let valueData: string | null = null;
	// $: value.update((v: any) => {
	// 	v = valueData;
	// 	return v;
	// });
</script>

<div class="wf__form__group">
	{#if type !== "checkbox" && type !== "radio"}
		<label for={id} class="label wf__form__label">{label}</label>
	{/if}

	{#if kind === "input"}
		{#if type === "date" || type == "datetime-local"}
			<input
				{id}
				use:typeAction
				class="input {classes} wf__form__control"
				name={String(field)}
				bind:value={$proxy}
				{disabled}
				{readonly}
			/>
		{:else if type !== "checkbox" && type !== "radio"}
			<input
				{id}
				use:typeAction
				class="input {classes} wf__form__control"
				name={String(field)}
				bind:value={$value}
				{disabled}
			/>
		{:else}
			<input
				{id}
				type="checkbox"
				class="checkbox {classes} wf__form__control"
				bind:checked={$boolValue}
				{readonly}
			/>
			<label
				for={id}
				class="label flex items-center pt-2 space-x-2 wf__form__label"
				>{label}</label
			>
		{/if}
	{:else if kind === "textarea"}
		<textarea
			{id}
			class="textarea {classes} wf__form__control"
			rows="4"
			name={String(field)}
			bind:value={$value}
			{disabled}
			{readonly}
		/>
	{:else if kind === "select"}
		{#if multiple}
			<select
				{id}
				class="select {classes} wf__form__control"
				name={String(field)}
				multiple
				bind:value={$value}
				{disabled}
				size="2"
			>
				{#if selectOptions && selectOptions.length > 0}
					{#each selectOptions as { value, text }}
						<option {value}>{text}</option>
					{/each}
				{/if}
			</select>
		{:else}
			<select
				{id}
				class="select {classes} wf__form__control"
				name={String(field)}
				bind:value={$value}
				{disabled}
			>
				{#if selectOptions && selectOptions.length > 0}
					{#each selectOptions as { value, text }}
						<option {value}>{text}</option>
					{/each}
				{/if}
			</select>
		{/if}
	{/if}

	{#if $errors}
		<div class="flex flex-col wf__form__error">
            {#if $errors.length > 0}
                {#each $errors as error}
                    <span class="flex text-red-500 text-sm">{error}</span>
                {/each}
            {:else if $errors.hasOwnProperty(errors) && $errors.errors > 0}
                {#each $errors.errors as error}
                    <span class="flex text-red-500 text-sm">{error}</span>
                {/each}
            {/if}
		</div>
	{/if}
</div>
