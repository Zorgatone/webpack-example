var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpack_config = require("./webpack.config");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");

// Compile JS sources with Webpack
gulp.task("webpack", function (callback) {
	webpack(webpack_config, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack", err);
		}

		gutil.log("[webpack]", stats.toString({
			colors: true
		}));

		callback();
	});
});

// Webpack Dev Server
gulp.task("webpack-dev-server", function (callback) {
	var compiler = webpack(webpack_config);
	var webpack_dev_config = Object.assign({
		stats: {
			colors: true
		}
	}, webpack_config.devServer);

	new WebpackDevServer(compiler, webpack_dev_config).listen(8080, "localhost", function (err) {
		if (err) {
			throw new gutil.PluginError("webpack-dev-server", err);
		}

		// Server listening
		gutil.log("[webpack-dev-server]", "http://localhost:8080/index.html");

		// keep the server alive or continue?
		// callback();
	});
});

// Watch JS files for changes
gulp.task("watch", ["webpack"], function () {
	gulp.watch([
		"www/js/**/*.js",
		"!www/js/pack.js",
		"!www/js/**/*.min.js"
	], ["webpack"]);
});

gulp.task("lint", function () {
	return gulp.src(["*.js", "www/js/**/*.js", "!www/js/lib/**/*.js", "!www/js/pack.js"])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish, {
			verbose: true
		}));
});

// Will use webpack-dev-server as the default task when typing `gulp` without a task name
gulp.task("default", ["webpack-dev-server"]);
