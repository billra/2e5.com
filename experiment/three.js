var svgEdit;
var svgNS = "http://www.w3.org/2000/svg";

function svgClear() {
	svgEdit.innerHTML = '';
}

function svgSerialize() {
	var svgXml = (new XMLSerializer).serializeToString(svgEdit);
	logMsg(svgXml);
}

function svgBall() {
	svgAppend('<circle id="todo" style="stroke:blue;stroke-width:4;fill:cyan;" cx="290" cy="200" r="20"/>');
}

function svgGrid() {

	var code =
'<defs>\
  <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">\
	<path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>\
  </pattern>\
  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">\
	<rect width="100" height="100" fill="url(#smallGrid)"/>\
	<path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>\
  </pattern>\
</defs>\
<rect width="100%" height="100%" fill="url(#grid)" />'

	svgAppend(code);
}

function svgAppend(code) {
	// svg from string, one way to do it: render and copy
	var container = document.createElement('div');
	container.innerHTML = '<svg>' + code + '</svg>';
	Array.prototype.slice.call(container.childNodes[0].childNodes).forEach(function (el) { svgEdit.appendChild(el) });
}

function svgProperties() {
	var curve = document.getElementById("testPath");
	var len = curve.getTotalLength();
	var pos = curve.getPointAtLength(len);
	var bbox = curve.getBBox();
	logMsg("path len", len, 'end xy', pos.x, pos.y, 'bbox:', bbox.x, bbox.y, bbox.x+bbox.width, bbox.y+bbox.height, bbox.style);
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

var dynCode;

function runCode() {
	var code = codeEdit.getValue();
	var script = document.createElement('script');
	script.innerHTML = 'try{' + code + '}catch(e){logMsg("Code Error:",e.message);}';
	dynCode.innerHTML = ''; // clear previous children
	dynCode.appendChild(script);
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-

function setupCodeWindow() {
	codeEdit = ace.edit("codeWindow");
	codeEdit.setTheme("ace/theme/chrome");
	codeEdit.getSession().setMode("ace/mode/javascript");
	codeEdit.setValue('// your JavaScript code here\nlogMsg("hello world");')
}

function setupLogWindow() {
	logEdit = ace.edit("logWindow");
	logEdit.setTheme("ace/theme/chrome");
	logEdit.setReadOnly(true);
	logClear();
}

function setupSvgWindow() {
	svgEdit = document.getElementById("svgWindow");
	svgAppend('<circle id="yellowCircle1" style="stroke:blue;stroke-width:4;fill:yellow;" cx="170" cy="200" r="20"/>'); // example initialization
	svgAppend('<circle id="orangeCircle1" style="stroke:blue;stroke-width:4;fill:darkorange;" cx="230" cy="200" r="20"/>');
	svgAppend('<path id="testPath" d="M10,10 l20,10 l-10,10" style="stroke: #0000cc; stroke-width: 2px; fill:#ccccff;"/>')
	svgGrid();
}

window.onload = function () {
	setupCodeWindow();
	setupLogWindow();
	setupSvgWindow();
	dynCode = document.getElementById("dynamicCode");
}
