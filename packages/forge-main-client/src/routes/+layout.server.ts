import type { Locales } from '$i18n/i18n-types';
import type { CurrentLoggedInUser } from '$lib/shared';
import type { LayoutServerLoad } from './$types';

/**
 * Root layout is responsible of returning global application data that can be
 * used everywhere across the application like the current {@link Locales}
 *
 * See: https://kit.svelte.dev/docs/load#layout-data
 */
export const load = (async (event) => ({
	locale: (event.params.lang as Locales | undefined) ?? ('en' as Locales),
	currentLoggedInUser: (event.locals.currentLoggedInUser as CurrentLoggedInUser) ?? null
})) satisfies LayoutServerLoad;
