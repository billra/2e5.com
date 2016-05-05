function WireSvgToEdit(movementContainer,svgid,htmXid,htmYid) {
	// lookups called only once
	var svgobj=document.getElementById(svgid);
	var htmXobj=document.getElementById(htmXid);
	var htmYobj=document.getElementById(htmYid);

	// wire edit to svg
	WireEditChange(htmXobj,svgobj,'cx');
	WireEditChange(htmYobj,svgobj,'cy');

	// track old positions
	var oldX; // strategy: track mouse move offset, add to object position
	var oldY;
	var oldColor;

	// mouse down on actual svg object
	svgobj.onmousedown=function(evt){
		evt.preventDefault(); // disable browser drag and drop
		oldX=evt.clientX;
		oldY=evt.clientY;
		oldColor=svgobj.style.fill;
		svgobj.style.fill='green';
		// update html
		theName.innerHTML=svgid;
		// move tracked from svg container so we don't get a premature onmouseleave
		movementContainer.onmousemove=function(evt) {
			evt.preventDefault(); // disable browser drag and drop
			nowX=parseInt(svgobj.getAttribute('cx'))+evt.clientX-oldX;
			nowY=parseInt(svgobj.getAttribute('cy'))+evt.clientY-oldY;
			oldX=evt.clientX;
			oldY=evt.clientY;
			svgobj.setAttribute('cx',nowX);
			svgobj.setAttribute('cy',nowY);
			// update contents of edit boxes
			htmXobj.value=nowX;
			htmYobj.value=nowY;
		};
		// likewise, end move tracked from container
		var endmove=function(evt) {
			svgobj.style.fill=oldColor;
			// update html
			theName.innerHTML='nothing';
			// unwire svg object events
			movementContainer.onmousemove=null;
			movementContainer.onmouseup=null;
			movementContainer.onmouseleave=null;
		};
		movementContainer.onmouseup=endmove;
		movementContainer.onmouseleave=endmove;
	};
}

function WireEditChange(htmobj,svgobj,svgattr) {
	// initial state: edit takes value of svg item
    htmobj.value=svgobj.getAttribute(svgattr);
	// function called for each change
	htmobj.onchange=function(){
		svgobj.setAttribute(svgattr,htmobj.value);
	};
}

window.onload=function() {
	WireSvgToEdit(svg1,'yellowCircle1','yellowCircleXposEdit1','yellowCircleYposEdit1');
	WireSvgToEdit(svg1,'orangeCircle1','orangeCircleXposEdit1','orangeCircleYposEdit1');
	WireSvgToEdit(svg2,'yellowCircle2','yellowCircleXposEdit2','yellowCircleYposEdit2');
	WireSvgToEdit(svg2,'orangeCircle2','orangeCircleXposEdit2','orangeCircleYposEdit2');
};
