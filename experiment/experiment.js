// experiment in js svg interaction

// -=-=-=-=-=-=-=-=-=-=-=-=-=- Two Balls -=-=-=-=-=-=-=-=-=-=-=-=-=-

function WireSvgToEdit(movementContainer, svgid, htmXid, htmYid) {
	// lookups called only once
	var svgobj = document.getElementById(svgid);
	var htmXobj = document.getElementById(htmXid);
	var htmYobj = document.getElementById(htmYid);

	// wire edit to svg
	WireEditChange(htmXobj, svgobj, 'cx');
	WireEditChange(htmYobj, svgobj, 'cy');

	// track old positions
	var oldX; // strategy: track mouse move offset, add to object position
	var oldY;
	var oldColor;

	// mouse down on actual svg object
	svgobj.onmousedown = function (evt) {
		evt.preventDefault(); // disable browser drag and drop
		oldX = evt.clientX;
		oldY = evt.clientY;
		oldColor = svgobj.style.fill;
		svgobj.style.fill = 'green';
		// update html
		theName.innerHTML = svgid;
		// move tracked from svg container so we don't get a premature onmouseleave
		movementContainer.onmousemove = function (evt) {
			evt.preventDefault(); // disable browser drag and drop
			nowX = parseInt(svgobj.getAttribute('cx')) + evt.clientX - oldX;
			nowY = parseInt(svgobj.getAttribute('cy')) + evt.clientY - oldY;
			oldX = evt.clientX;
			oldY = evt.clientY;
			svgobj.setAttribute('cx', nowX);
			svgobj.setAttribute('cy', nowY);
			// update contents of edit boxes
			htmXobj.value = nowX;
			htmYobj.value = nowY;
		};
		// likewise, end move tracked from container
		var endmove = function (evt) {
			svgobj.style.fill = oldColor;
			// update html
			theName.innerHTML = 'nothing';
			// unwire svg object events
			movementContainer.onmousemove = null;
			movementContainer.onmouseup = null;
			movementContainer.onmouseleave = null;
		};
		movementContainer.onmouseup = endmove;
		movementContainer.onmouseleave = endmove;
	};
}

function WireEditChange(htmobj, svgobj, svgattr) {
	// initial state: edit takes value of svg item
	htmobj.value = svgobj.getAttribute(svgattr);
	// function called for each change
	htmobj.onchange = function () {
		svgobj.setAttribute(svgattr, htmobj.value);
	};
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- Two Balls, Two Lines -=-=-=-=-=-=-=-=-=-=-=-=-=-

function WireEditChange2(htmobj, svgobj, svgattr, svgLineobj, svgLineattr) {
	// initial state: edit takes value of svg item
	htmobj.value = svgobj.getAttribute(svgattr);
	// function called for each change
	htmobj.onchange = function () {
		svgobj.setAttribute(svgattr, htmobj.value);
		svgLineobj.setAttribute(svgLineattr, htmobj.value);
	};
}

// todo: solve code duplication
function WireSvgToEditLine(movementContainer, svgid, svgLineid, svgEndid, htmXid, htmYid) {
	// lookups called only once
	var svgobj = document.getElementById(svgid);
	var svgLineobj = document.getElementById(svgLineid);
	var htmXobj = document.getElementById(htmXid);
	var htmYobj = document.getElementById(htmYid);
	var svgEndobj = document.getElementById(svgEndid);
	var baseX = svgEndobj.getAttribute('cx');
	var baseY = svgEndobj.getAttribute('cy');

	// wire edit to svg
	WireEditChange2(htmXobj, svgobj, 'cx', svgLineobj, 'x1');
	WireEditChange2(htmYobj, svgobj, 'cy', svgLineobj, 'y1');

	// track old positions
	var oldX; // strategy: track mouse move offset, add to object position
	var oldY;
	var oldColor;

	// mouse down on actual svg object
	svgobj.onmousedown = function (evt) {
		evt.preventDefault(); // disable browser drag and drop
		oldX = evt.clientX;
		oldY = evt.clientY;
		oldColor = svgobj.style.fill;
		svgobj.style.fill = 'green';
		// update html
		theName.innerHTML = svgid;
		// move tracked from svg container so we don't get a premature onmouseleave
		movementContainer.onmousemove = function (evt) {
			evt.preventDefault(); // disable browser drag and drop
			nowX = parseInt(svgobj.getAttribute('cx')) + evt.clientX - oldX;
			nowY = parseInt(svgobj.getAttribute('cy')) + evt.clientY - oldY;
			oldX = evt.clientX;
			oldY = evt.clientY;
			svgobj.setAttribute('cx', nowX);
			svgobj.setAttribute('cy', nowY);
			svgLineobj.setAttribute('x1', nowX);
			svgLineobj.setAttribute('y1', nowY);

			var angleDeg = Math.atan2(baseY - nowY, baseX - nowX) * 180 / Math.PI;
			document.getElementById('theAngle').textContent = angleDeg; // todo: as a parameter

			// update contents of edit boxes
			htmXobj.value = nowX;
			htmYobj.value = nowY;
		};
		// likewise, end move tracked from container
		var endmove = function (evt) {
			svgobj.style.fill = oldColor;
			// update html
			theName.innerHTML = 'nothing';
			// unwire svg object events
			movementContainer.onmousemove = null;
			movementContainer.onmouseup = null;
			movementContainer.onmouseleave = null;
		};
		movementContainer.onmouseup = endmove;
		movementContainer.onmouseleave = endmove;
	};
}

function saveSvg() {
	var link = document.createElement("a");
	link.download = "drawing.svg"; // download
	// link.target = "_blank"; // open in new tab
	link.href = "data:image/svg+xml;utf8," + svg2.outerHTML; // encoding?
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- Angle Control -=-=-=-=-=-=-=-=-=-=-=-=-=-

function createAngleControl(svgid, rotAngleid, openAngleid, rotAngle, openAngle) {
	var svgobj = document.getElementById(svgid);
	var rotAngleobj = document.getElementById(rotAngleid);
	var openAngleobj = document.getElementById(openAngleid);
	var svgNS = "http://www.w3.org/2000/svg";

	var bcr = svgobj.getBoundingClientRect();

	var obj = document.createElementNS(svgNS, "circle");
	obj.setAttribute("id", "todo");
	obj.setAttribute("cx", bcr.width / 2);
	obj.setAttribute("cy", bcr.width / 2);
	obj.setAttribute("r", 20);
	obj.setAttribute("class", "movable orange")

	svgobj.appendChild(obj);

	rotAngleobj.textContent = rotAngle;
	openAngleobj.textContent = openAngle;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=- main -=-=-=-=-=-=-=-=-=-=-=-=-=-

window.onload = function () {
	WireSvgToEdit(svg1, 'yellowCircle1', 'yellowCircleXposEdit1', 'yellowCircleYposEdit1');
	WireSvgToEdit(svg1, 'orangeCircle1', 'orangeCircleXposEdit1', 'orangeCircleYposEdit1');
	WireSvgToEditLine(svg2, 'yellowCircle2', 'yellowLine2', 'greyCircle2', 'yellowCircleXposEdit2', 'yellowCircleYposEdit2');
	WireSvgToEditLine(svg2, 'orangeCircle2', 'orangeLine2', 'greyCircle2', 'orangeCircleXposEdit2', 'orangeCircleYposEdit2');
	createAngleControl("andgleDisplay3", "rotationAngle3", "openAngle3", 90, 15)
};
