import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { getSession } from '$lib/server/middleware/session.js';
import { Modules, getAll, getOne } from '$lib/shared/index.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, params: { id }, cookies }) => {
	const session = getSession(cookies);
	const project = await getOne({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
		id,
		populate: [
			{ field: 'clients', collectionName: Modules.USERS },
			{ field: 'workers', collectionName: Modules.USERS },
			{ field: 'manager', collectionName: Modules.USERS },
			{ field: 'tasks', collectionName: Modules.TASKS }
		],
		token: session?.sessionToken
	});

	const users = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
		requestQuery: {
			excludeFields: [
				'email',
				'phone',
				'address',
				'preferredLanguage',
				'projects',
				'permissions',
				'changeLog'
			],
			limit: '-1'
		},
		token: session?.sessionToken
	});

	return {
		project: project.data ?? null,
		users: users.data ?? { items: [], pagination: { totalItems: 0, page: 1 } },
		session
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
