const webpack = require('webpack');

module.exports = function override(config, env) {
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /three\/src\/constants\/sRGBEncoding/,
      'three/src/constants/LinearEncoding'
    )
  );
  return config;
};
