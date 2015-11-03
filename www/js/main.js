define(["./utils"], function (utils) {
	utils.hello();

	document.addEventListener("DOMContentLoaded", function(event) {
		require("./common.js").greeter("Hello, World!");
	});
});
