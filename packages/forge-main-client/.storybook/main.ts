import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
    addons: [
        '@storybook/addon-svelte-csf',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-docs',
        '@storybook/addon-styling',
        '@storybook/addon-mdx-gfm'
    ],
    framework: {
        name: '@storybook/sveltekit',
        options: {}
    },
    staticDirs: ['../static'],
    docs: {
        autodocs: 'tag'
    }
};
export default config;
