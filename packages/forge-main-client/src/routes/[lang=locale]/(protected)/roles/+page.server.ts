import type { PageServerLoad } from './$types.js';
import { Modules, getAll } from '$lib/shared/index.js';
import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { getSession } from '$lib/server/middleware/session.js';

export const load: PageServerLoad = (async ({ fetch, cookies }) => {
	const session = getSession(cookies);
	const roles = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.ROLES}`,
		token: session?.sessionToken
	});

	return {
		roles: roles.data ?? { items: [], pagination: { totalItems: 0, page: 1 } },
		session
	};
}) satisfies PageServerLoad;
