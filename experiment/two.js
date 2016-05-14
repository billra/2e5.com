var editor;
var dynCode;
var result;
var textContainer;

function run_code() {
	editor.save();
	var code = textContainer.value;
	var script = document.createElement('script');
	script.innerHTML = code;
	dynCode.innerHTML = ''; // clear previous children
	dynCode.appendChild(script);
}

function showResult(val) {
	result.innerHTML = val;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-

window.onload = function () {
	dynCode = document.getElementById("dynamicCode");
	result = document.getElementById("divTarget");
	textContainer = document.getElementById("editor");
	editor = CodeMirror.fromTextArea(textContainer, {
		lineNumbers: true,
		mode: "javascript",
		theme: "mdn-like"
	});
}