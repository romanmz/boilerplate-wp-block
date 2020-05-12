const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
						{
							loader: miniCssExtractPlugin.loader,
						},
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
					style: {
						name: 'style',
						test: /style\.scss$/,
						chunks: 'async',
						enforce: true,
					},
					editor: {
						name: 'editor',
						test: /editor\.scss$/,
						chunks: 'async',
						enforce: true,
					},
				},
			},
		},
		plugins: [
			...defaultConfig.plugins,
			new CleanWebpackPlugin(),
			new miniCssExtractPlugin({
				filename: '[name].css',
			}),
		],
	}
}
