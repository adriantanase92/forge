<script lang="ts">
	export let text: string = 'Title';
</script>

<h2
	class="font-secondary font-semibold block text-3xl {$$restProps.class ? $$restProps.class : ''}"
>
	{text}
</h2>
