var fs = require('fs');
var url = require('url');
var path = require('path');
var webpack = require('webpack');

var DEBUG = !process.argv.production;

var GLOBALS = {
	'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
	'__DEV__': DEBUG
};

module.exports = {
	devtool: 'source-map',
	// Main entry directory and file
	entry: {
		app: [
			// 'webpack/hot/dev-server',
			path.join(__dirname, 'app', 'main.js')
		]
	},

	// Output directories and file
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/durandal-webpack/dist/',
		devtoolModuleFilenameTemplate: '../[resource-path]'
	},

	// Custom plugins
	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new webpack.optimize.OccurenceOrderPlugin()
	]
	.concat(DEBUG ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	]),

	module: {
		loaders: [
			{ test: /\.html$/, loader: 'html' },
			{ test: /\.json$/, loader: 'json' }
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx', '.json'],

		modulesDirectories: [
			'node_modules',
			'app'
		],

		root: path.join(__dirname, 'app'),

		alias: {
			durandal: 'durandal/js',
			plugins: 'durandal/js/plugins'
		}
	},

	externals: {
		jquery: 'jQuery'
	},

	devServer: {
		contentBase: __dirname,
		hot: false,
		host: '0.0.0.0',
		port: 3001,
		inline: true,
		historyApiFallback: true,
		stats: { colors: true },
		progress: true,
		disableHostCheck: true,
		proxy: {
            "/api": {
			//   target: 'http://ccpms.iask.in/gateway/',
			  target: 'http://localhost:8088/gateway/',
              pathRewrite: {'^/api' : ''},
              changeOrigin: true
            }
        },
	}
};
