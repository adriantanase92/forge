import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Root route always redirect to projects. The `session` middleware will handle
 * the access to it during the redirection.
 *
 * See: https://kit.svelte.dev/docs/load#page-data
 */
export const load = (({ locals: { t } }) => {
	throw redirect(302, t.routes.protected.dashboard());
}) satisfies PageServerLoad;
