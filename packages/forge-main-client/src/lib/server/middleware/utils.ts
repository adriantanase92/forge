import { randomUUID } from 'crypto';
import type {
	ActionFailure,
	Handle,
	HttpError,
	Redirect,
	RequestEvent,
	ResolveOptions
} from '@sveltejs/kit';
import { logger } from '$lib/shared';
import type { Logger } from '$lib/shared/services/logger';

export function middlewareRunner(name: string, buildHandler: MiddlewareBuilder): Handle {
	return async ({ event, resolve }) => {
		const logs = logger.child({
			workflow: `${name}-middleware`,
			workflowId: randomUUID()
		});
		const handler = buildHandler({
			logger: logs,
			event,
			resolve
		});

		if (handler.canSkip()) {
			return await handler.resolve();
		} else {
			return await handler.run();
		}
	};
}

export type MiddlewareBuilder = (params: MiddlewareBuilderParams) => Middleware;

export interface MiddlewareBuilderParams {
	logger: Readonly<Logger>;
	event: RequestEvent;
	resolve: RequestResolver;
}

export interface Middleware {
	canSkip(): boolean;
	resolve(): MaybePromise<Response>;
	run(): MaybePromise<Response>;
}

export type RequestResolver = (event: RequestEvent, opt?: ResolveOptions) => MaybePromise<Response>;

export interface HandlerInput {
	event: RequestEvent;
	resolve: RequestResolver;
}

export type MaybePromise<T> = T | Promise<T>;
export type SvelteKitError = Error | HttpError | ActionFailure | Redirect;
