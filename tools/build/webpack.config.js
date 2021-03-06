const webpackMerge = require('webpack-merge'),
  webpackConfig = require('angular-webpack-config');

const copyWebpackPlugin = require('copy-webpack-plugin'),
  htmlElementsWebpackPlugin = require('html-elements-webpack-plugin');

const browserConfig = function(root, settings) {
  return {
    plugins: [
      new copyWebpackPlugin([
        {
          from: `${root(settings.paths.src.client.assets.root)}/config.local.json`,
          to: './config.local.json'
        },
        {
          from: `${root(settings.paths.src.client.assets.root)}/i18n/en.json`,
          to: './i18n/en.json'
        },
        {
          from: `${root(settings.paths.src.client.assets.root)}/i18n/tr.json`,
          to: './i18n/tr.json'
        }
      ]),

      new htmlElementsWebpackPlugin(require(root(`${settings.paths.tools.config}/html-elements.config`)))
    ]
  };
};

const testNodeConfig = function() {
  return {
    node: {
      fs: 'empty',
      process: 'mock'
    }
  };
};

module.exports = function(options, root, settings) {
  switch (options.env) {
    case 'prod':
    case 'production':
      return !!options.platform
        ? options.platform === 'server'
          ? webpackConfig.universal.server.prod(root, settings)
          : webpackMerge(webpackConfig.universal.browser.prod(root, settings), browserConfig(root, settings))
        : webpackMerge(webpackConfig.spa.prod(root, settings), browserConfig(root, settings));
    case 'test':
    case 'testing':
      return webpackMerge(webpackConfig.test(root, settings), testNodeConfig());
    case 'dev':
    case 'development':
      return !!options.platform
        ? options.platform === 'server'
          ? webpackConfig.universal.server.dev(root, settings)
          : webpackMerge(webpackConfig.universal.browser.dev(root, settings), browserConfig(root, settings))
        : options.hmr
          ? webpackMerge(webpackConfig.spa.hmr(root, settings), browserConfig(root, settings))
          : webpackMerge(webpackConfig.spa.dev(root, settings), browserConfig(root, settings));
  }
};
