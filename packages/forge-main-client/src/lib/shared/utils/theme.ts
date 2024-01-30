import { UserRole } from '.';

// ----------------- Colors
const transformColorsObjectToArray = (colorsObject: Record<string, string>) => {
	return Object.entries(colorsObject).map(([name, code]) => ({
		name,
		code
	}));
};

export const primaryColors = {
	gallery: '#f0f3ff',
	cobalt: '#0e62be',
	'cobalt-alt': '#62b3f4',
	rhino: '#2e3767',
	'rhino-alt': '#7984a9'
};
export const primaryColorsArray = transformColorsObjectToArray(primaryColors);

export const secondaryColors = {
	curious: '#4db3ff',
	eucalyptus: '#24a749',
	cucumber: '#bae089',
	lime: '#99d62f',
	malibu: '#9cddff'
};
export const secondaryColorsArray = transformColorsObjectToArray(secondaryColors);

export const informColors = {
	success: '#58c322',
	'success-alt': '#ecf8e6',
	warning: '#fa9600',
	'warning-alt': '#fef3e0',
	error: '#d41111',
	'error-alt': '#ffebed'
};
export const informColorsArray = transformColorsObjectToArray(informColors);

export const greyColors = {
	greyGallery: '#BFCDFF'
};

export const greyColorsArray = transformColorsObjectToArray(greyColors);

export const monochromeColors = {
	white: '#ffffff',
	black: '#000000'
};

export const monochromeColorsArray = transformColorsObjectToArray(monochromeColors);

export const otherUtilityColors = {
	transparent: 'transparent',
	none: 'none'
};
export const otherUtilityColorsArray = transformColorsObjectToArray(otherUtilityColors);

export const colors = {
	...primaryColors,
	...secondaryColors,
	...informColors,
	...greyColors,
	...monochromeColors,
	...otherUtilityColors
};

export const colorsArray = Object.entries(colors).map(([name, color]) => ({ name, color }));

export type color =
	| 'gallery'
	| 'cobalt'
	| 'cobaltAlt'
	| 'rhino'
	| 'rhinoAlt'
	| 'success'
	| 'successAlt'
	| 'error'
	| 'errorAlt'
	| 'warning'
	| 'warningAlt'
	| 'curious'
	| 'eucalyptus'
	| 'transparent'
	| 'white';

// ----------------- Color Options per Color
export type colorOptions = {
	backGround: string;
	text: string;
	border: string;
};

export type colorOptionsPerColorType = Record<string, colorOptions>;

export const colorOptionsPerColor: colorOptionsPerColorType = {
	gallery: {
		backGround: 'bg-gallery',
		text: 'text-gallery',
		border: 'border-gallery'
	},
	cobalt: {
		backGround: 'bg-cobalt',
		text: 'text-cobalt',
		border: 'border-cobalt'
	},
	cobaltAlt: {
		backGround: 'bg-cobalt-alt',
		text: 'text-cobalt-alt',
		border: 'border-cobalt-alt'
	},
	rhino: {
		backGround: 'bg-rhino',
		text: 'text-rhino',
		border: 'border-rhino'
	},
	rhinoAlt: {
		backGround: 'bg-rhino-alt',
		text: 'text-rhino-alt',
		border: 'border-rhino-alt'
	},
	success: {
		backGround: 'bg-success',
		text: 'text-success',
		border: 'border-success'
	},
	successAlt: {
		backGround: 'bg-success-alt',
		text: 'text-success-alt',
		border: 'border-success-alt'
	},
	error: {
		backGround: 'bg-error',
		text: 'text-error',
		border: 'border-error'
	},
	errorAlt: {
		backGround: 'bg-error-alt',
		text: 'text-error-alt',
		border: 'border-error-alt'
	},
	warning: {
		backGround: 'bg-warning',
		text: 'text-warning',
		border: 'border-warning'
	},
	warningAlt: {
		backGround: 'bg-warning-alt',
		text: 'text-warning-alt',
		border: 'border-warning-alt'
	},
	curious: {
		backGround: 'bg-curious',
		text: 'text-curious',
		border: 'border-curious'
	},
	cucumber: {
		backGround: 'bg-cucumber',
		text: 'text-cucumber',
		border: 'border-cucumber'
	},
	eucalyptus: {
		backGround: 'bg-eucalyptus',
		text: 'text-eucalyptus',
		border: 'border-eucalyptus'
	},
	lime: {
		backGround: 'bg-lime',
		text: 'text-lime',
		border: 'border-lime'
	},
	malibu: {
		backGround: 'bg-malibu',
		text: 'text-malibu',
		border: 'border-malibu'
	},
	white: {
		backGround: 'bg-white',
		text: 'text-white',
		border: 'border-white'
	}
};

export const getColorOptionsByUserRole = (role: UserRole) => {
	const colorsByRole = {
		[UserRole.ADMIN]: {
			text: 'text-error',
			background: 'bg-error',
			border: 'border-error',
			divider: 'divide-error'
		},
		[UserRole.CLIENT]: {
			text: 'text-curious',
			background: 'bg-curious',
			border: 'border-curious',
			divider: 'divide-curious'
		},
		[UserRole.MANAGER]: {
			text: 'text-eucalyptus',
			background: 'bg-eucalyptus',
			border: 'border-eucalyptus',
			divider: 'divide-eucalyptus'
		},
		[UserRole.WORKER]: {
			text: 'text-rhino',
			background: 'bg-rhino',
			border: 'border-rhino',
			divider: 'divide-rhino'
		}
	};

	return colorsByRole[role];
};

// ----------------- Fonts Exports
export const fonts = {
	primary: ['Inter', 'sans-serif'],
	secondary: ['Syne', 'sans-serif']
};

// ----------------- Breakpoints Exports
export const breakpoints = {
	'3xs': `360px`,
	'2xs': `420px`,
	xs: `560px`,
	sm: `768px`,
	md: `1024px`,
	lg: `1280px`,
	xl: `1440px`,
	'2xl': `1920px`,
	'3xl': `2560px`,
	'4xl': `3440px`,
	'5xl': `3840px`
};
