import type { RequiredParams } from 'typesafe-i18n';
import type { Locales } from './i18n-types';

export function localeRoutes(locale: Locales) {
	return {
		href: `/${locale}/{0}` as RequiredParams<'0'>,
		public: {
			logIn: `/${locale}/login`
		},
		protected: {
			notFound: `/${locale}/not-found`,
			logOut: `/${locale}/logout`,
			dashboard: `/${locale}/dashboard`,
			users: `/${locale}/users`,
			roles: `/${locale}/roles`,
			permissions: `/${locale}/permissions`,
			projects: `/${locale}/projects`,
			tasks: `/${locale}/tasks`,
			profile: `/${locale}/profile`
		}
	};
}
