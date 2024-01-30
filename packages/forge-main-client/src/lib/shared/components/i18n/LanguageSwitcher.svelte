<script lang="ts">
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { page } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';
	import { browser } from '$app/environment';
	import { chooseLocale } from '$i18n';
	import Dropdown from '$lib/shared/components/general/dropdown/Dropdown.svelte';
	import Language from './Language.svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';

	let open: boolean = false;

	export let color: 'white' | 'rhino' = 'rhino';

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => chooseLocale(state.locale);

	const switchLanguage = (lang: Locales) => {
		open = false;
		chooseLocale(lang);
	};

	// update locale when page store changes
	$: if (browser) {
		const lang = $page.params.lang as Locales;
		chooseLocale(lang);
	}
</script>

<svelte:window on:popstate={handlePopStateEvent} />

<div class="relative leading-none">
	<Button
		kind="custom"
		color="transparent"
		class="font-secondary font-medium {color === 'rhino' ? 'text-rhino' : 'text-white'}"
		on:click={() => (open = !open)}
	>
		<Language language={$locale} {color} />
	</Button>
	<Dropdown {open} class="left-[-20px]">
		<div class="flex flex-col justify-center">
			{#each locales as lang}
				{#if lang !== $locale}
					<Button
						kind="custom"
						color="transparent"
						class="font-secondary font-medium {color === 'rhino'
							? 'text-rhino'
							: 'text-white'} px-5 py-2 hover:bg-gray-100 hover:first:rounded-t-lg hover:last:rounded-b-lg"
						on:click={() => switchLanguage(lang)}
					>
						<Language language={lang} color="rhino" />
					</Button>
				{/if}
			{/each}
		</div>
	</Dropdown>
</div>
