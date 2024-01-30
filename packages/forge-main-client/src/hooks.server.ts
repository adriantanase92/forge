import { building } from '$app/environment';
import { requestHandler, init, errorHandler } from '$lib/server';

// Initializes client app
if (!building) {
	await init();
}

// This function runs every time the SvelteKit server receives a request
// See https://kit.svelte.dev/docs/hooks#server-hooks
export const handle = requestHandler;

// This function runs every time the SvelteKit server throw an error
// See https://kit.svelte.dev/docs/hooks#shared-hooks-handleerror
export const handleError = errorHandler;
