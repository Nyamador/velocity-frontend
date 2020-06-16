const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

webpackConfig = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		mimeTypes: { 'text/html': ['phtml'] },
		compress: true,
		port: 9000,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: false,
			title: 'Velocity Design',
		}),
		new CleanWebpackPlugin(),
		new OptimizeCssAssetsPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					// Order Of Loaders are important
					'style-loader',
					{ loader: MiniCssExtractPlugin.loader },
					'css-loader',
					'less-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]',
					},
				},
			},
		],
	},
};

module.exports = webpackConfig;
