import { building } from '$app/environment';
import { errorHandler, init } from '$lib/client';

// Initializes client app
if (!building) {
	await init();
}

// This function runs every time the SvelteKit server throw an error
// See https://kit.svelte.dev/docs/hooks#shared-hooks-handleerror
export const handleError = errorHandler;
