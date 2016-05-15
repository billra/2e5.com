var editor;
var dynCode;
var result;
var textContainer;
var dynLog;

function run_code() {
	editor.save();
	var code = textContainer.value;
	var script = document.createElement('script');
	script.innerHTML = 'try{' + code + '}catch(e){log("Code Error:",e.message);}';
	dynCode.innerHTML = ''; // clear previous children
	dynCode.appendChild(script);
}

function showResult(val) {
	result.innerHTML = val;
}

function log(msg) {
	var str = "";
	for (var i = 0; i < arguments.length; i++) { // comma separated items to log
		str += ' ' + arguments[i].toString();
	}
	str += "<br>";
	dynLog.innerHTML += str;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-

window.onload = function () {
	dynLog = document.getElementById("consoleLog");
	dynCode = document.getElementById("dynamicCode");
	result = document.getElementById("divTarget");
	textContainer = document.getElementById("editor");
	editor = CodeMirror.fromTextArea(textContainer, {
		lineNumbers: true,
		mode: "javascript",
		theme: "mdn-like"
	});
}