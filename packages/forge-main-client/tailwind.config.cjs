import { colors, fonts, breakpoints } from './src/lib/shared/utils';

/** @type {import('tailwindcss').Config}*/
const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: { ...breakpoints },
		extend: {
			colors: { ...colors },
			fontFamily: { ...fonts }
		}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
	darkMode: 'class'
};

module.exports = config;
