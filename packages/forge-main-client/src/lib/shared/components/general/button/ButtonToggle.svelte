<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let toggled: boolean = false;
	export let disabled: boolean = false;

	// Optional: Pass a label or use a slot for the button content
	export let label: string = '';
	export let id: string = crypto.randomUUID();

	// Emit an event when the toggle state changes
	const dispatch = createEventDispatcher<{ change: { toggled: boolean; id: string } }>();

	const toggle = () => {
		if (disabled) return;
		toggled = !toggled;
		dispatch('change', { toggled, id });
	};
</script>

<div>
	<input
		class="h-3.5 w-10 appearance-none rounded-[0.4375rem] bg-rhino before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-rhino-alt after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] after:ml-[-0.2rem] checked:bg-curious checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.3625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-cobalt checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-curious checked:focus:bg-curious checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:bg-none"
		type="checkbox"
		role="switch"
		{disabled}
		{id}
		checked={toggled}
		on:click={toggle}
	/>
	{#if label}
		<label class="inline-block pl-[0.15rem] hover:cursor-pointer" for={id}>{label}</label>
	{:else}
		<slot />
	{/if}
</div>
