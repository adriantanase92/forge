import { getLocales } from '$i18n';
import '$lib/server/polyfill';
import { initServices as initSharedServices } from '$lib/shared';

/** Initializes all server third party services. */
export async function init() {
	await getLocales();
	initSharedServices();
}
