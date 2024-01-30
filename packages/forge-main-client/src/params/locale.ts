import type { ParamMatcher } from '@sveltejs/kit';
import type { Locales } from '$i18n/i18n-types';
import { locales } from '$i18n/i18n-util';

export const match = ((param) => locales.includes(param as Locales)) satisfies ParamMatcher;
