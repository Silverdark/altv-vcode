const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

module.exports = {
	entry: {
		main: './src/App.jsx',
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'client', 'html')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.css$/,
				include: APP_DIR,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							namedExport: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				include: MONACO_DIR,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.ttf$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				path.join(process.cwd(), 'dist/**/*')
			]
		}),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new MonacoWebpackPlugin({
			// available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
			languages: ['javascript', 'typescript', 'json']
		}),
		new CopyPlugin({
			patterns: [
				{ from: "altv-client", to: "../../" },
			],
		})
	],
};
