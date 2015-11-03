module.exports = {
	// Configuration
	context: __dirname + "/www",
	entry: "./js/main.js",
	output: {
		path: __dirname + "/www/js",
		filename: "pack.js",
		pathinfo: true
	},
	debug: true,
	devtool: "source-map",
	devServer: {
		contentBase: "./www"
	}
};
