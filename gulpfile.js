var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpack_config = require("./webpack.config");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var jsonlint = require("gulp-jsonlint");
var path = require("path");

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

	new WebpackDevServer(compiler, webpack_config.devServer).listen(8080, "localhost", function (err) {
		if (err) {
			throw new gutil.PluginError("webpack-dev-server", err);
		}

		// Server listening
		gutil.log(gutil.colors.green.bold("[webpack-dev-server] http://localhost:8080/index.html"));

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

gulp.task("lint-json", function () {
	function reporter (file) {
		gutil.log(gutil.colors.red("File "), gutil.colors.cyan(path.relative(__dirname, file.path)), gutil.colors.red(" is not valid JSON."));
	}

	return gulp.src(["*.json", "www/**/*.json", "!www/js/lib/**/*.json"])
		.pipe(jsonlint())
		.pipe(jsonlint.reporter(reporter));
});

gulp.task("lint-js", function () {
	return gulp.src(["*.js", "www/js/**/*.js", "!www/js/lib/**/*.js", "!www/js/pack.js"])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish, {
			verbose: true
		}));
});

gulp.task("lint", ["lint-js", "lint-json"]);

// Will use webpack-dev-server as the default task when typing `gulp` without a task name
gulp.task("default", ["webpack-dev-server"]);
