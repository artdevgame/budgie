module.exports = {
  babel: async (options) => ({
    ...options,
    // plugins: [...options.plugins, 'nativewind/babel'],
  }),
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-postcss',
    'storybook-addon-designs',
  ],
  features: {
    interactionsDebugger: true,
  },
  framework: '@storybook/react',
  staticDirs: ['../static'],
  stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: { ...config.resolve.alias, 'react-native$': 'react-native-web' },
    },
  }),
};
