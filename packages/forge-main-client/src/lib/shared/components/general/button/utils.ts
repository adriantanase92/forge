import { colorOptionsPerColor, type color } from '$lib/shared/utils';
import type { kind } from './types';

export const getCssColorClassesFromColor = (color: color, kind: kind): string => {
	const classes = [];

	if (kind === 'outline') {
		classes.push(
			'bg-transparent',
			'border-2',
			'border-solid',
			colorOptionsPerColor[color].border,
			colorOptionsPerColor[color].text
		);
	} else {
		if (color === 'transparent') {
			classes.push('bg-transparent text-current');
		} else if (color === 'white') {
			classes.push(colorOptionsPerColor[color].backGround, 'text-rhino');
		} else {
			classes.push(colorOptionsPerColor[color].backGround, 'text-white');
		}
	}

	return classes.join(' ');
};

export const getCssKindClassesFromKind = (kind: kind): string => {
	let classes = '';

	if (kind === 'fill') {
		classes = 'rounded-3xl';
	} else if (kind === 'outline') {
		classes = 'rounded-3xl';
	} else if (kind === 'icon') {
		classes = 'rounded-full';
	}

	return classes;
};
