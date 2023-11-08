module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-anonymous-display-name', 'react-native-reanimated/plugin'],
  };
};
