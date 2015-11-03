var webpack = require("webpack");
var path = require("path")

module.exports = {
	// Configuration
	context: path.resolve(__dirname, "www"),
	entry: "./js/main.js",
	output: {
		path: path.resolve(__dirname, "www/js"),
		filename: "pack.js",
		publicPath: "/js/",
		pathinfo: true
	},
	debug: true,
	devtool: "source-map",
	devServer: {
		contentBase: "./www",
		publicPath: "/js/",
		stats: {
			colors: true
		},
		hot: true,
		noInfo: false,
		port: 8080,
		host: "localhost"
	}/*,
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]*/
};
