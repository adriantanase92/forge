<script lang="ts">
	import '../app.css';
	import { setLocale } from '$i18n/i18n-svelte';
	import type { LayoutServerData } from './$types';

	/** Layout data computed by the server. */
	export let data: LayoutServerData;

	// Before doing anything sets the local to ensure that string values will be
	// correctly initialized.
	setLocale(data.locale);

	// Also ensure that the local is updated when the `locale` is updated.
	$: setLocale(data.locale);
</script>

<slot />
