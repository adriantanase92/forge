import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { getSession } from '$lib/server/middleware/session.js';
import { Modules, UserRole, getAll } from '$lib/shared/index.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({
	fetch,
	cookies,
	locals: { t, currentLoggedInUser }
}) => {
	const session = getSession(cookies);
	const getProjects = async () => {
		if (currentLoggedInUser.role === UserRole.ADMIN || currentLoggedInUser.role === 'owner') {
			return await getAll({
				fetch,
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
				requestQuery: {
					populate: [
						{ field: 'clients', collectionName: Modules.USERS },
						{ field: 'workers', collectionName: Modules.USERS },
						{ field: 'manager', collectionName: Modules.USERS }
					]
				},
				token: session?.sessionToken
			});
		} else {
			const projects = currentLoggedInUser.projects;
			if (projects && projects.length > 0) {
				return await getAll({
					fetch,
					apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
					requestQuery: {
						populate: [
							{ field: 'clients', collectionName: Modules.USERS },
							{ field: 'workers', collectionName: Modules.USERS },
							{ field: 'manager', collectionName: Modules.USERS }
						],
						ids: projects
					},
					token: session?.sessionToken
				});
			} else {
				throw redirect(303, t.routes.protected.dashboard());
			}
		}
	};

	const projects = await getProjects();

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
		projects: projects.data ?? { items: [], pagination: { totalItems: 0, page: 1 } },
		users: users.data ?? { items: [], pagination: { totalItems: 0, page: 1 } },
		session
	};
}) satisfies PageServerLoad;
