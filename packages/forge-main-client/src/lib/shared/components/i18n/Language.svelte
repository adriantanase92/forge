<script lang="ts">
	import type { Locales } from '$i18n/i18n-types';
	import { SvgIcon } from '$lib/shared/components/general/svg';
	import type { iconName } from '$lib/shared/components/general/svg/icons';

	// Specify the color of the language text
	export let color: 'white' | 'rhino' = 'rhino';
	// Specify the language
	export let language: Locales = 'en';

	const flagIconNames: Record<string, iconName> = {
		en: 'en-flag',
		fr: 'fr-flag',
		nl: 'nl-flag'
	};

	$: selectedLanguage = flagIconNames[language];
</script>

<div class="flex items-center">
	{#key selectedLanguage}
		<SvgIcon name={selectedLanguage} width="22" height="22" />
	{/key}

	<span
		class="font-secondary ml-2 text-base capitalize font-medium {color === 'rhino'
			? 'text-rhino'
			: 'text-white'}"
	>
		{language}
	</span>
</div>
