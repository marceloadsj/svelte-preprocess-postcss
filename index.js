const postcssLoadConfig = require(`postcss-load-config`)
const postcss = require(`postcss`)

module.exports = (context = {}) => {
	const { useConfigFile = true, configFilePath, plugins = [] } = context

	if (useConfigFile === false) {
		return ({ content }) => Promise.resolve(process(plugins, content))
	} else {
		const configPromise = postcssLoadConfig(context, configFilePath)

		return ({ content }) => configPromise.then(
			({ plugins, dependencies }) => process(plugins, content)
		)
	}
}

function process(plugins, css) {
	return postcss(plugins)
		.process(css, { from: undefined })
		.then(code => ({ code }))
}
