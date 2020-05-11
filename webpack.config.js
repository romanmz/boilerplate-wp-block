const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = env => {
	return {
		...defaultConfig,
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
					test: /\.s?css$/,
					include: __dirname+'/src',
					use: [
						miniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
								import: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									outputStyle: 'compressed',
								},
							},
						},
					],
				},
			],
		},
		optimization: {
			...defaultConfig.optimization,
			splitChunks: {
				cacheGroups: {
					'style': {
						name: 'style',
						test: /style\.scss$/,
						chunks: 'all',
						enforce: true,
					},
					'editor': {
						name: 'editor',
						test: /editor\.scss$/,
						chunks: 'all',
						enforce: true,
					},
				},
			},
		},
		plugins: [
			...defaultConfig.plugins,
			new miniCssExtractPlugin({
				filename: '[name].css',
			}),
			// delete useless js files created for the css chunks
			{
				apply( compiler ) {
					compiler.hooks.shouldEmit.tap( 'Remove styles from output', compilation => {
						delete compilation.assets['style.js'];
						delete compilation.assets['editor.js'];
						return true;
					});
				}
			},
		],
	}
}
