<script lang="ts">
	import SvgIcon from '../svg/SvgIcon.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalize, escapeString } from '$lib/shared/utils';
	import { createEventDispatcher } from 'svelte';
	import { z } from 'zod';

	// Define a Zod schema for the search input
	const SearchSchema = z.string().trim().min(1).or(z.literal('')).transform(escapeString);
	// Specify debounce time in milliseconds
	const debounceTime = 800;
	// Specify the css classes for the wrapper div around the search input and icon
	export let wrapperClasses: string = 'w-full sm:w-auto';
	// Specify the css classes for the search input
	export let inputClasses: string =
		'max-w-full sm:max-w-[240px] w-full sm:w-auto rounded-lg border border-solid border-rhino-alt py-2 pl-10 pr-3 text-rhino';
	// Specify the css classes for the icon element
	export let searchClasses: string = 'absolute left-2 top-2';

	// Initialize the search query variable and timeout
	let search = '';
	let timeout: number | NodeJS.Timeout;

	const dispatch = createEventDispatcher();

	const handleInput = () => {
		// Clear the existing timeout
		if (timeout) clearTimeout(timeout);

		// Set a new timeout
		timeout = setTimeout(() => {
			const validatedSearch = SearchSchema.parse(search);
			dispatch('searchBy', { search: validatedSearch });
		}, debounceTime);
	};
</script>

<div class="relative {wrapperClasses}">
	<SvgIcon class={searchClasses} name="search" width="24" height="24" />
	<input
		type="text"
		bind:value={search}
		on:input={handleInput}
		placeholder="{capitalize($LL.fields.search.text())}..."
		class={inputClasses}
	/>
</div>
