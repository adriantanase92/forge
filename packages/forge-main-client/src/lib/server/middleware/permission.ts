/* eslint-disable @typescript-eslint/no-unused-vars */
import { isAsset, isDashboardRoute, isLogOutRoute, isLoginRoute } from '$lib/shared';
import { redirect } from '@sveltejs/kit';
import type { MiddlewareBuilder } from './utils';

/** Implements the `permission` middleware interface */
export default (({ logger, event, resolve }) => {
	return {
		canSkip() {
			return isAsset(event.route.id, event.url) || isLoginRoute(event.route.id);
		},
		resolve() {
			return resolve(event);
		},
		async run() {
			return await Promise.resolve(hasPermissionToAccessRoute()).then((_) => resolve(event));
		}
	};

	function hasPermissionToAccessRoute() {
		const {
			locals: { t, currentLoggedInUser },
			route: { id }
		} = event;
		const currentLoggedInUserPermissions = currentLoggedInUser.permissions;

		if (
			(processRouteId(id).length > 0 &&
				currentLoggedInUserPermissions[processRouteId(id)[0]] !== undefined &&
				currentLoggedInUserPermissions[processRouteId(id)[0]].read) ||
			isDashboardRoute(id) ||
			isLogOutRoute(id)
		) {
			logger.info('user has permission to access this route', { event });
			return event;
		} else {
			logger.error('user does not have permission to access this route', { event });
			throw redirect(303, `${t.routes.protected.dashboard()}`);
		}
	}
}) satisfies MiddlewareBuilder;

const processRouteId = (routeId: string | null): string[] => {
	if (routeId === null) {
		return [];
	}
	// Define the pattern to remove
	const patternToRemove = '/[lang=locale]/(protected)/';

	// Remove the pattern from the input string
	const modifiedString = routeId.replace(patternToRemove, '');

	// Split the modified string into an array by '/'
	const stringArray = modifiedString.split('/').filter(Boolean);

	return stringArray;
};
