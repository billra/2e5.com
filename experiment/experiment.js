function WireSvgToEdit(svgid, htmXid, htmYid) {
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
		oldColor=svgobj.getAttribute('fill');
		svgobj.setAttribute('fill','green');
		// update html
		theName.innerHTML=svgid;
		// move tracked from svg container so we don't get a premature onmouseleave
		svgContainer.onmousemove=function(evt) {
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
			svgobj.setAttribute('fill',oldColor);
			// update html
			theName.innerHTML='nothing';
			// unwire svg object events
			svgContainer.onmousemove=null;
			svgContainer.onmouseup=null;
			svgContainer.onmouseleave=null;
		};
		svgContainer.onmouseup=endmove;
		svgContainer.onmouseleave=endmove;
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
	WireSvgToEdit('yellowCircle','yellowCircleXposEdit','yellowCircleYposEdit');
	WireSvgToEdit('orangeCircle','orangeCircleXposEdit','orangeCircleYposEdit');
};
