import { redirect } from '@sveltejs/kit';
import { isAsset } from '$lib/shared';
import type { MiddlewareBuilder } from './utils';

/** Implements the `not-found` middleware interface */
export default (({ logger, event, resolve }) => ({
	canSkip() {
		return event.route.id !== null || isAsset(event.route.id, event.url);
	},
	resolve() {
		return resolve(event);
	},
	run() {
		const {
			locals: { t }
		} = event;
		logger.warn('Page not found', { event });
		throw redirect(303, t.routes.protected.notFound());
	}
})) satisfies MiddlewareBuilder;
