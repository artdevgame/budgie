module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = ['.web.ts', '.web.tsx', ...config.resolve.extensions];
    return config;
  },
};
