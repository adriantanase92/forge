import { sequence } from '@sveltejs/kit/hooks';
import locale from './locale';
import notFound from './not-found';
import session from './session';
import { middlewareRunner } from './utils';
import permission from './permission';

export const requestHandler = sequence(
	middlewareRunner('locale', locale),
	middlewareRunner('session', session),
	middlewareRunner('not-found', notFound),
	middlewareRunner('permission', permission)
);
