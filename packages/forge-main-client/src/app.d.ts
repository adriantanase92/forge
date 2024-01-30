import type { CurrentLoggedInUser } from '$lib/shared/business';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales;
			t: TranslationFunctions;
			currentLoggedInUser: CurrentLoggedInUser | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
