const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = env => {
	const isDevelopment = process.env.NODE_ENV !== 'production';
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
									outputStyle: 'expanded',
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
			isDevelopment ? null : new OptimizeCSSAssetsPlugin(),
			{
				apply( compiler ) {
					compiler.hooks.shouldEmit.tap( 'Remove js files created from css chunks', compilation => {
						delete compilation.assets['style.js'];
						delete compilation.assets['style.js.map'];
						delete compilation.assets['editor.js'];
						delete compilation.assets['editor.js.map'];
						return true;
					});
				}
			},
		].filter( Boolean ),
	}
}
