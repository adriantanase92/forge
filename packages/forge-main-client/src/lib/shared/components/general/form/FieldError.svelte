<script lang="ts">
	export let errors:
		| string[]
		| any
		| ({ _errors?: string[] | undefined } & Record<number, string[]>)
		| undefined = undefined;

	$: error = errors !== undefined && errors.length > 0 ? errors[0] : null;
</script>

{#if error !== null}
	<span class="font-secondary font-medium text-error mt-2 block {$$props.class}">{error}</span>
{/if}
