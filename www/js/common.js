module.exports = {
	greeter: function (name) {
		var el, elements;

		if (typeof name === "string" && name.length > 0) {
			elements = document.getElementsByTagName("h1");

			if (elements && elements.length) {
				el = elements[0];
				el.innerText = name;
			}
		}
	}
}
