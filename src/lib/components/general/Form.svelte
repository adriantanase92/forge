<script lang="ts">
	import { enhance } from "$app/forms";

	export let id: string;
	export let action: string;
	export let method: "GET" | "POST" = "POST";
	export let submitFunction: any;
</script>

<form
	{id}
	class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token wf__form"
	action="?/{action}"
	{method}
	use:enhance={submitFunction}
>
	<slot />
</form>
