import type { notificationKind, notificationType } from './type';
import type { iconName } from '../svg/icons';
import { colors } from '$lib/shared';

export const getIconBasedOnType = (type: notificationType): iconName => {
	const iconsClasses = {
		success: 'check',
		error: 'alert',
		warning: 'warning',
		info: 'info'
	};

	return String(iconsClasses[type] ?? 'default') as iconName;
};

export const getIconColor = (type: notificationType): string => {
	const iconColorClasses = {
		success: colors.success,
		error: colors.error,
		warning: colors.warning,
		info: colors.cobalt
	};

	return iconColorClasses[type];
};

export const getCssClasses = (kind: notificationKind, type: notificationType) => {
	const bgClasses = {
		success: 'bg-success-alt',
		error: 'bg-error-alt',
		warning: 'bg-warning-alt',
		info: 'bg-cobalt-alt'
	};

	const borderClasses = {
		success: 'border-success',
		error: 'border-error',
		warning: 'border-warning',
		info: 'border-cobalt'
	};

	const styleClasses = {
		fill: 'rounded-xl',
		outline: 'rounded-xl border-2 border-solid',
		transparent: 'bg-transparent'
	};

	const textClasses = {
		success: 'text-success',
		error: 'text-error',
		warning: 'text-warning',
		info: 'text-cobalt'
	};

	return `${styleClasses[kind]} ${kind === 'fill' ? bgClasses[type] : ''} ${
		kind === 'outline' ? borderClasses[type] : ''
	} ${textClasses[type]}`;
};
