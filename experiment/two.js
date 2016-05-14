var editor;
var dynCode;
var result;

function run_code() {
	editor.save();
	var code = editor.value;
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
	editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
		lineNumbers: true,
		mode: "javascript",
		theme: "mdn-like"
	});
}
