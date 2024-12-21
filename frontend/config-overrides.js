const { override, overrideDevServer } = require('customize-cra');

module.exports = {
  webpack: override(),
  devServer: overrideDevServer((config) => {
    config.allowedHosts = ['localhost'];
    return config;
  }),
};