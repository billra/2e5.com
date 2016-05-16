var svgEdit;

function svgClear() {
	svgEdit.innerHTML = '';
}

function svgSerialize() {
	var svgXml = (new XMLSerializer).serializeToString(svgEdit);
	logMsg(svgXml);
}

function svgBall() {
	var svgNS = "http://www.w3.org/2000/svg";
	var obj = document.createElementNS(svgNS, "circle");
	obj.setAttribute("id", "todo");
	obj.setAttribute("cx", 290);
	obj.setAttribute("cy",200);
	obj.setAttribute("r", 20);
	obj.setAttribute("style", "stroke:blue;stroke-width:4;fill:cyan;");
	svgEdit.appendChild(obj);
}

var codeEdit;

function codeClear() {
	codeEdit.setValue('');
}

function codeUndo() {
	codeEdit.undo();
}

function codeRedo() {
	codeEdit.redo();
}

var logEdit;

function logMsg() {
	var args = Array.prototype.slice.call(arguments);
	var session = logEdit.getSession();
	session.insert({
		row: session.getLength(),
		column: 0
	}, "\n" + args.join(' '));
	logEdit.scrollToLine(session.getLength());
}

function logClear() {
	logEdit.setValue('Log Entries:');
	logEdit.clearSelection();
}

function setupEditControls() {
	codeEdit = ace.edit("codeWindow");
	codeEdit.setTheme("ace/theme/chrome");
	codeEdit.getSession().setMode("ace/mode/javascript");
	logEdit = ace.edit("logWindow");
	logEdit.setTheme("ace/theme/chrome");
	logEdit.setReadOnly(true);
	logClear();
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-

window.onload = function () {
	setupEditControls();
	svgEdit = document.getElementById("svgWindow");
}
