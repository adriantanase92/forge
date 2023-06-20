<script lang="ts">
	import { enhance } from "$app/forms";

	export let id: string;
	export let action: string;
	export let method: "GET" | "POST" = "POST";
	export let submitFunction: any;
	export let classes: string | null = null;
</script>

<form
	{id}
	class="{classes} wf__form"
	action="?/{action}"
	{method}
	use:enhance={submitFunction}
>
	<slot />
</form>
