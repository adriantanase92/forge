<script lang="ts">
	import type { kind, selectOption, type } from "./types.js";

	export let labelText: string = "";
	export let isLabelVisible: boolean = false;
	export let id: string;
	export let value: string | number | null = null;
	export let kind: kind = "input";
	export let type: type = "text";
	export let placeholder: string = "";
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let selectOptions: selectOption[] = [];
</script>

<div class="wf__form__group" class:my-0={type === "hidden"}>
	{#if type !== "checkbox" && type !== "radio"}
		<label
			for={id}
			class:hidden={!isLabelVisible}
			class="label wf__form__label"
		>
			{labelText}
		</label>
	{/if}

	{#if kind === "input"}
		<input
			class="input variant-form-material mt-0 wf__form__control"
			{id}
			name={id}
			{value}
			{type}
			{placeholder}
			{disabled}
			{readonly}
			{checked}
		/>

		{#if type === "checkbox" || type === "radio"}
			<label for={id} class="label wf__form__label">
				{labelText}
			</label>
		{/if}
	{:else if kind === "textarea"}
		<textarea
			class="textarea variant-form-material wf__form__control"
			{id}
			name={id}
			value=""
			rows="4"
			{placeholder}
			{disabled}
			{readonly}
		/>
	{:else if kind === "select"}
		<select
			{id}
			name={id}
			class="select variant-form-material wf__form__control"
		>
			{#each selectOptions as { value, text }}
				<option {value}>{text}</option>
			{/each}
		</select>
	{/if}
</div>
