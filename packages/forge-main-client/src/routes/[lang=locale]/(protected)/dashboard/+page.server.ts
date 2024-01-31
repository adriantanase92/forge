import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { getSession } from '$lib/server/middleware/session.js';
import {
	Modules,
	UserRole,
	getAll,
	getProjectPropertyBasedOnUserRole,
	getProjectsForUser
} from '$lib/shared/index.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({
	fetch,
	cookies,
	locals: { currentLoggedInUser }
}) => {
	const session = getSession(cookies);

	if (currentLoggedInUser.role === 'owner' || currentLoggedInUser.role === UserRole.ADMIN) {
		const users = await getAll({
			fetch,
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
			requestQuery: {
				limit: '-1',
				excludeFields: [
					'permissions',
					'preferredLanguage',
					'projects',
					'email',
					'firstName',
					'phone',
					'lastName',
					'address',
					'changeLog'
				]
			},
			token: session?.sessionToken
		});

		const projects = await getAll({
			fetch,
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
			requestQuery: {
				limit: '-1',
				excludeFields: ['clients', 'description', 'manager', 'name', 'tasks', 'workers']
			},
			token: session?.sessionToken
		});

		return {
			users: users.data.items ?? [],
			projects: projects.data.items ?? []
		};
	} else {
		const userProjects = await getProjectsForUser({
			fetch,
			apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
			id: currentLoggedInUser._id,
			property: getProjectPropertyBasedOnUserRole(currentLoggedInUser.role),
			token: session?.sessionToken
		});

		return {
			userProjects: userProjects.data ?? []
		};
	}
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
