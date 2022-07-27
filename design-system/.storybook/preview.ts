import '../static/styles.css';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { viewports as breakpoints } from '../src/common/breakpoints';
import { globalDecorators } from './decorators';

// Create custom viewports using widths defined in design tokens
const breakpointViewports = Object.keys(breakpoints).reduce((acc, key) => {
  acc[`breakpoint${key}`] = {
    name: `Breakpoint - ${key}`,
    styles: {
      width: `${breakpoints[key as keyof typeof breakpoints]}px`,
      // Account for padding and border around viewport preview
      height: 'calc(100% - 20px)',
    },
    type: 'other',
  };
  return acc;
}, {} as typeof INITIAL_VIEWPORTS);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      // color: /(background|color)$/i,
      // date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...breakpointViewports,
      ...INITIAL_VIEWPORTS,
    },
  },
};

export const decorators = globalDecorators;
