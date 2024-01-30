import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { getSession } from '$lib/server/middleware/session.js';
import { Modules, getOne } from '$lib/shared/index.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, params: { id }, cookies }) => {
	const session = getSession(cookies);
	const user = await getOne({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
		id,
		populate: [{ field: 'projects', collectionName: Modules.PROJECTS }],
		token: session?.sessionToken
	});

	return {
		user: user.data ?? null,
		session
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
