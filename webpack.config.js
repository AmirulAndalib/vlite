const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		entry: {
			demo: `${path.resolve(__dirname, './src/demo/config.js')}`
		},
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: 'scripts/[name].js',
			clean: true
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [path.resolve(__dirname, './src')],
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.css$/,
					include: [path.resolve(__dirname, './src')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: path.resolve(__dirname, './postcss.config.js')
								}
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.js', '.css'],
			alias: {
				shared: path.resolve(__dirname, './src/shared')
			}
		},
		devServer: {
			static: {
				directory: path.resolve(__dirname, './dist')
			},
			historyApiFallback: true,
			port: 3000,
			compress: true,
			hot: true
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new MiniCssExtractPlugin({
				filename: 'styles/[name].css',
				chunkFilename: 'styles/[name].css'
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: path.resolve(__dirname, './src/demo/views/demo.html')
			}),
			new webpack.optimize.ModuleConcatenationPlugin()
		],
		stats: {
			assets: true,
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false,
			children: false,
			entrypoints: false,
			excludeAssets: /.map$/,
			assetsSort: '!size'
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					parallel: true,
					terserOptions: {
						compress: {
							// Drop console.log|console.info|console.debug
							// Keep console.warn|console.error
							pure_funcs: ['console.log', 'console.info', 'console.debug']
						},
						mangle: true
					}
				}),
				new CssMinimizerPlugin()
			],
			chunkIds: 'deterministic', // or 'named'
			removeAvailableModules: true,
			removeEmptyChunks: true,
			mergeDuplicateChunks: true,
			providedExports: false,
			splitChunks: false
		}
	}
}
