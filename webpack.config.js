const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
module.exports = env => {
	return {
		...defaultConfig,
		entry: {
			index: defaultConfig.entry.index,
			style: glob.sync( './src/**/style.scss' ),
			editor: glob.sync( './src/**/editor.scss' ),
		},
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
		plugins: [
			...defaultConfig.plugins.filter( plugin => plugin.constructor.name !== 'DependencyExtractionWebpackPlugin' ),
			new DependencyExtractionWebpackPlugin({
				injectPolyfill: true,
				combineAssets: true,
			}),
			new FixStyleOnlyEntriesPlugin(),
			new miniCssExtractPlugin({
				filename: '[name].css',
			}),
		],
	}
}
