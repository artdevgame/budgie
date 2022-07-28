const packageJson = require('./package.json');

const reactNativeDeps = Object.keys(packageJson.dependencies).filter((dep) => dep.startsWith('react-native'));

const withTM = require('next-transpile-modules')(['@budgie/design-system', 'nativewind', ...reactNativeDeps]);

// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = ['.web.ts', '.web.tsx', ...config.resolve.extensions];
    return config;
  },
};

module.exports = withTM(nextConfig);
