const defaultConfig = require('@wordpress/scripts/config/webpack.config');
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
							loader: 'file-loader',
							options: {
								name: '[name].css',
							},
						},
						{
							loader: 'extract-loader',
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
	}
}
