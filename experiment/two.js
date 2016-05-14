var editor = null;

function run_code() {
	editor.save();
	var code = document.getElementById("editor").value;
	document.getElementById("dynamicCode").innerHTML = ''; // clear previous children

	var script = document.createElement('script');
	script.innerHTML = code;

	document.getElementById('dynamicCode').appendChild(script);
}

function showResult(val) {
	document.getElementById("divTarget").innerHTML = val;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-

window.onload = function () {
	editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
		lineNumbers: true,
		mode: "javascript",
		theme: "mdn-like"
	});
}
