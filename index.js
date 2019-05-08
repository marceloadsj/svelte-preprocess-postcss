const postcssLoadConfig = require(`postcss-load-config`);
const postcss = require(`postcss`);

module.exports = (context = {}) => {
  const {
    useConfigFile = true,
    configFilePath,
    plugins = [],
    dependencies
  } = context;

  if (useConfigFile === false) {
    return ({ content }) =>
      Promise.resolve(process(plugins, content, dependencies));
  } else {
    return ({ content }) => {
      const configPromise = postcssLoadConfig(context, configFilePath);

      return configPromise.then(({ plugins }) =>
        process(plugins, content, dependencies)
      );
    };
  }
};

function process(plugins, css, dependencies) {
  return postcss(plugins)
    .process(css, { from: undefined })
    .then(code => ({ code, dependencies }));
}
