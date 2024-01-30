import type { Preview } from '@storybook/svelte';
import '../src/app.css';

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Intro', 'Base', ['Colors', 'Typography', 'Breakpoints', 'Shadows', 'Libraries'], 'Components', '*']
            }
        },
        backgrounds: {
            default: 'light'
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
};

export default preview;
