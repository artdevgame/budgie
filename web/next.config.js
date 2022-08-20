const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'react-native-web',
  'react-native-svg',
  'native-base',
  'react-native-svg',
]);

const nextConfig = {};

module.exports = withPlugins(
  [
    withTM,
    [withExpo, { projectRoot: __dirname }],
    // your plugins go here.
  ],
  nextConfig,
);
