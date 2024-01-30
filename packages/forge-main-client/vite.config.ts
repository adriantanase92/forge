import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: 'esnext'
	},
	ssr: {
		noExternal: ['typesafe-i18n']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
