import { getLocales } from '$i18n';
import { initServices as initSharedServices } from '$lib/shared';

/** Initializes all client third party services. */
export async function init() {
	await getLocales();
	initSharedServices();
}
