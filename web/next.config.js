const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'react-native-web',
  'react-native-svg',
  'native-base',
  'react-native-svg',
]);

// @type {import('next').NextConfig}
const nextConfig = { reactStrictMode: true };

module.exports = withPlugins(
  [withTM, [withFonts, { projectRoot: __dirname }], [withExpo, { projectRoot: __dirname }]],
  nextConfig,
);
