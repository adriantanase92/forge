import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { getSession } from '$lib/server/middleware/session.js';
import { Modules, getAll } from '$lib/shared/index.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, cookies }) => {
	const session = getSession(cookies);
	const users = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
		requestQuery: {
			excludeFields: ['permissions', 'preferredLanguage', 'projects']
		},
		token: session?.sessionToken
	});

	return {
		users: users.data ?? { items: [], pagination: { totalItems: 0, page: 1 } },
		session
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
