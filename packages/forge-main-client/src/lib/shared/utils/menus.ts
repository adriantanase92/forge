import type { TranslationFunctions } from '$i18n/i18n-types';
import type { iconName } from '$lib/shared/components/general/svg/icons';
import { Modules } from '.';

export type dropdownItem = {
	url: string;
	text: string;
};

export type menuItem = {
	type: 'link' | 'dropdown';
	text: string;
	url?: string;
	id: string;
	dropdownItems?: dropdownItem[];
	icon?: iconName;
	isExternal?: boolean;
	module?: Modules;
};

export type allLanguagesMenuItems = menuItem[];

export const sidebarUserMenuItems = (t: TranslationFunctions): allLanguagesMenuItems => [
	{
		type: 'link',
		url: t.routes.protected.dashboard(),
		text: t.menus.sidebar.dashboard(),
		id: 'dashboard',
		icon: 'dashboard'
	},
	{
		type: 'link',
		url: t.routes.protected.users(),
		text: t.menus.sidebar.users(),
		id: 'users',
		icon: 'people',
		module: Modules.USERS
	},
	{
		type: 'link',
		url: t.routes.protected.permissions(),
		text: t.menus.sidebar.permissions(),
		id: 'permissions',
		icon: 'key',
		module: Modules.PERMISSIONS
	},
	{
		type: 'link',
		url: t.routes.protected.roles(),
		text: t.menus.sidebar.roles(),
		id: 'roles',
		icon: 'accessibility',
		module: Modules.ROLES
	},
	{
		type: 'link',
		url: t.routes.protected.projects(),
		text: t.menus.sidebar.projects(),
		id: 'projects',
		icon: 'gallery-vertical',
		module: Modules.PROJECTS
	}
];
