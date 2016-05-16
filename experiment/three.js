// -=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-

function setupEditControls() {
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/chrome");
	editor.getSession().setMode("ace/mode/javascript");
	var log = ace.edit("logWindow");
	log.setTheme("ace/theme/chrome");
	log.setReadOnly(true);
}
window.onload = function () {
	setupEditControls();
}
