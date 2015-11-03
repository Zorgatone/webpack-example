define(["./utils"], function (utils) { // AMD module definition + import
	utils.hello();

	document.addEventListener("DOMContentLoaded", function(event) {
		require("./common.js").greeter("Hello, World!"); // CommonJS import
	});
});
