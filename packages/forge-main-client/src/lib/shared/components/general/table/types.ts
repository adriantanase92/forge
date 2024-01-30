import type { color } from '$lib/shared/utils';
import type { iconName } from '../svg/icons';

export type TableHeader = {
	key: string;
	text: string;
	stylingClasses?: string;
};

export type TableItemValue = {
	value: string | number | null;
	stylingClasses?: string | null;
};

export type TableItem = Record<string, TableItemValue>;

export type TableAction = {
	type: 'button' | 'link';
	btnActionName?: string;
	text?: string;
	linkUrl?: string;
	linkType?: 'url' | 'email';
	linkTarget?: '_self' | '_blank' | '_parent' | '_top';
	linkBgColor?: color;
	icon?: {
		name: iconName;
		color?: string;
		width: string;
		height: string;
	};
	buttonColor?: color;
	class?: string;
	condition?: string;
};

export type TableOnClickDispatcherEvent = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
	actionName: string;
};
