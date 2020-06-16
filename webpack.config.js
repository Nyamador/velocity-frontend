const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
    },
    devServer : {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins : [
            new MiniCssExtractPlugin(), 
            new HtmlWebpackPlugin({
                template: './index.html',
                minify: false,
                title: 'Velocity Design'
            })
        ],
	module: {
		rules: [
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
		],
    },
};

module.exports = webpackConfig;
