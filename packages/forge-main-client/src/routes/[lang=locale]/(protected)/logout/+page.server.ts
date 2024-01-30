import { getSession, resetData } from '$lib/server/middleware/session.js';
import type { PageServerLoad, RequestEvent } from './$types.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (async (event: RequestEvent) => {
	const {
		locals: { t }
	} = event;

	if (getSession(event.cookies) !== null) {
		await resetData(event);
	}

	throw redirect(302, t.routes.public.logIn());
}) satisfies PageServerLoad;
