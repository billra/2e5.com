var lk = 0;
var lk1 = 0;
var surface = 0;
var innermargin = 0.8;
var outermargin = 1.4;
var bridleLength = 0;
var bridlesCascade;
var knotloss = 16; // 2 sides, both 8 cm

function setLk(newLk, leaveField) {
	if (new Number(newLk).toString() == 'NaN') {
		alert('Svp een getal invoeren');
		document.getElementById('lkField').value = lk;
	} else {
		lk = newLk;
		lk1 = lk * 0.9006;
		surface = 1.1684 * lk * lk / 10000;
		innermargin = getValue(Math.max(0.6, lk * 0.006), 1);
		outermargin = getValue(Math.max(1.2, lk * 0.009), 1);
		if (bridlesCascade) {
			bridleLength = 15.421 * lk1 + 19 * knotloss;
		} else {
			bridleLength = 25.636 * lk1 + 19 * knotloss;
		}
		setDimensions();
		if (leaveField!='lk') { document.getElementById('lkField').value = getValue(lk, 2);}
		if (leaveField!='lk1') { document.getElementById('lk1Field').value = getValue(lk1, 2);}
		if (leaveField!='surface') { document.getElementById('surfaceField').value = getValue(surface, 2);}
	}
}

function setLk1(newLk1) {
	if (new Number(newLk1).toString() == 'NaN') {
		alert('Svp een getal invoeren');
		document.getElementById('lk1Field').value = getValue(lk1, 2);
		setLk1(getValue(lk1, 2));
	} else {
		setLk(newLk1 /  0.9006, 'lk1');
	}
}

function setSurface(newSurface) {
	if (new Number(newSurface).toString() == 'NaN') {
		alert('Svp een getal invoeren');
		document.getElementById('surfaceField').value = getValue(surface, 2);
		setSurface(getValue(surface, 2));
	} else {
		setLk(Math.sqrt(newSurface /  1.1684) * 100, 'surface');
	}
}

function setDimensions() {
	document.getElementById('dimensions-width').innerHTML = getValue(lk * 2.010, 1);
	document.getElementById('dimensions-height').innerHTML = getValue(lk * 0.870, 1);
	document.getElementById('dimensions-center-top').innerHTML = getValue(lk * 0.450, 1);
	document.getElementById('dimensions-center-bottom').innerHTML = getValue(lk * 0.917, 1);
	document.getElementById('dimensions-center-left').innerHTML = getValue(lk * 0.9006, 1);
	document.getElementById('dimensions-center-right').innerHTML = getValue(lk * 0.9006, 1);
	document.getElementById('dimensions-edge-left').innerHTML = getValue(lk * 0.9006, 1);
	document.getElementById('dimensions-edge-right').innerHTML = getValue(lk * 0.9006, 1);
	document.getElementById('dimensions-wing-left').innerHTML = getValue(lk * 0.689, 1);
	document.getElementById('dimensions-wing-right').innerHTML = getValue(lk * 0.689, 1);

	document.getElementById('surfaceField').innerHTML = getValue(lk * lk * 1.1684 / 10000, 2) + ' m<sup>2</sup>';
	document.getElementById('spanwijdte').innerHTML = getValue(lk * 2.010, 1) + ' cm';
	document.getElementById('hoogte_midden').innerHTML = getValue(lk * 0.870, 1) + ' cm';

	document.getElementById('materialen-toomlijnen').innerHTML = getValue(bridleLength  / 100, 1) + ' m';

	document.getElementById('template-center-top-width').innerHTML = getValue(lk * 0.450, 1);
	document.getElementById('template-center-bottom-width').innerHTML = getValue(lk * 0.917, 1);
	document.getElementById('template-center-left-edge').innerHTML = getValue(lk * 0.901, 1);
	document.getElementById('template-center-right-edge').innerHTML = getValue(lk * 0.901, 1);
	document.getElementById('template-center-diag').innerHTML = getValue(lk * 1.101, 1);
	document.getElementById('template-center-margin-top').innerHTML = '+' + getValue(outermargin, 1);
	document.getElementById('template-center-margin-bottom').innerHTML = '+' + getValue(outermargin, 1);
	document.getElementById('template-center-margin-left').innerHTML = '+' + getValue(innermargin, 1);
	document.getElementById('template-center-margin-right').innerHTML = '+' + getValue(innermargin, 1);

	document.getElementById('template-wing-left-edge').innerHTML = getValue(lk * 0.901, 1);
	document.getElementById('template-wing-right-edge').innerHTML = getValue(lk * 0.901, 1);
	document.getElementById('template-wing-bottom-width').innerHTML = getValue(lk * 0.689, 1);
	document.getElementById('template-wing-left-margin-left').innerHTML = '+' + getValue(outermargin, 1);
	document.getElementById('template-wing-left-margin-right').innerHTML = '+' + getValue(innermargin, 1);
	document.getElementById('template-wing-left-margin-bottom').innerHTML = '+' + getValue(outermargin, 1);
	document.getElementById('template-wing-right-margin-left').innerHTML = '+' + getValue(innermargin, 1);
	document.getElementById('template-wing-right-margin-right').innerHTML = '+' + getValue(outermargin, 1);
	document.getElementById('template-wing-right-margin-bottom').innerHTML = '+' + getValue(outermargin, 1);

	document.getElementById('outermargin0').innerHTML = getValue(outermargin, 1);

	document.getElementById('t-length-total').innerHTML = getValue(lk * 0.161 + 20, 0);
	document.getElementById('neusversterking').innerHTML = getValue(lk * 0.5, 0);

	document.getElementById('nose_a').innerHTML = getValue(lk * 0.129, 1);
	document.getElementById('nose_b').innerHTML = getValue(lk * 0.050, 1);
	document.getElementById('nose_c').innerHTML = getValue(lk * 0.100, 1);
	document.getElementById('nose_d').innerHTML = getValue(lk * 0.082, 1);
	document.getElementById('nose_e').innerHTML = getValue(lk * 0.032, 1);
	document.getElementById('nose_f').innerHTML = getValue(lk * 0.020, 1);
	document.getElementById('nose_g').innerHTML = getValue(lk * 0.025, 1);
	document.getElementById('nose_h').innerHTML = getValue(lk * 0.086, 1);
	document.getElementById('nose_i').innerHTML = getValue(lk * 0.183, 1);
	document.getElementById('nose_j').innerHTML = getValue(lk * 0.029, 1);
	document.getElementById('nose_k').innerHTML = getValue(lk * 0.033, 1);
	document.getElementById('nose_l').innerHTML = getValue(lk * 0.103, 1);
	document.getElementById('nose_m').innerHTML = getValue(lk * 0.182, 1);
	document.getElementById('nose_n').innerHTML = getValue(lk * 0.082, 1);
	document.getElementById('nose_o').innerHTML = getValue(lk * 0.082, 1);

	document.getElementById('bridles-distance-a').innerHTML = getValue(lk1 / 12, 1);
	document.getElementById('bridles-distance-b').innerHTML = getValue(lk1 / 6, 1);

	document.getElementById('bridles-classic-a0').innerHTML = getValue(lk1 * 1.447, 1);
	document.getElementById('bridles-classic-a1').innerHTML = getValue(lk1 * 1.451, 1);
	document.getElementById('bridles-classic-a2').innerHTML = getValue(lk1 * 1.447, 1);
	document.getElementById('bridles-classic-a3').innerHTML = getValue(lk1 * 1.444, 1);
	document.getElementById('bridles-classic-a4').innerHTML = getValue(lk1 * 1.428, 1);
	document.getElementById('bridles-classic-a5').innerHTML = getValue(lk1 * 1.420, 1);
	document.getElementById('bridles-classic-a6').innerHTML = getValue(lk1 * 1.413, 1);
	document.getElementById('bridles-classic-a7').innerHTML = getValue(lk1 * 1.407, 1);
	document.getElementById('bridles-classic-a8').innerHTML = getValue(lk1 * 1.396, 1);
	document.getElementById('bridles-classic-a9').innerHTML = getValue(lk1 * 1.372, 1);
	document.getElementById('bridles-classic-a10').innerHTML = getValue(lk1 * 1.353, 1);
	document.getElementById('bridles-classic-a11').innerHTML = getValue(lk1 * 1.310, 1);
	document.getElementById('bridles-classic-a12').innerHTML = getValue(lk1 * 1.258, 1);
	document.getElementById('bridles-classic-b1').innerHTML = getValue(lk1 * 1.404, 1);
	document.getElementById('bridles-classic-b2').innerHTML = getValue(lk1 * 1.368, 1);
	document.getElementById('bridles-classic-b3').innerHTML = getValue(lk1 * 1.319, 1);
	document.getElementById('bridles-classic-b4').innerHTML = getValue(lk1 * 1.255, 1);
	document.getElementById('bridles-classic-b5').innerHTML = getValue(lk1 * 1.161, 1);
	document.getElementById('bridles-classic-b6').innerHTML = getValue(lk1 * 0.983, 1);

	lPrim = lk1 * 1.396/2;
	lPrim = lk1 * 1.396/2;
	document.getElementById('bridles-cascade-primary').innerHTML = getValue(lPrim, 1);

	document.getElementById('bridles-cascade-a0').innerHTML = getValue(lk1 * 1.447, 1);
	document.getElementById('bridles-cascade-a1').innerHTML = getValue(lk1 * 1.451 - lPrim, 1);
	document.getElementById('bridles-cascade-a2').innerHTML = getValue(lk1 * 1.447 - lPrim, 1);
	document.getElementById('bridles-cascade-a3').innerHTML = getValue(lk1 * 1.444 - lPrim, 1);
	document.getElementById('bridles-cascade-a4').innerHTML = getValue(lk1 * 1.428 - lPrim, 1);
	document.getElementById('bridles-cascade-a5').innerHTML = getValue(lk1 * 1.420 - lPrim, 1);
	document.getElementById('bridles-cascade-a6').innerHTML = getValue(lk1 * 1.413 - lPrim, 1);
	document.getElementById('bridles-cascade-a7').innerHTML = getValue(lk1 * 1.407 - lPrim, 1);
	document.getElementById('bridles-cascade-a8').innerHTML = getValue(lk1 * 1.396 - lPrim, 1);
	document.getElementById('bridles-cascade-a9').innerHTML = getValue(lk1 * 1.372 - lPrim, 1);
	document.getElementById('bridles-cascade-a10').innerHTML = getValue(lk1 * 1.353 - lPrim, 1);
	document.getElementById('bridles-cascade-a11').innerHTML = getValue(lk1 * 1.310 - lPrim, 1);
	document.getElementById('bridles-cascade-a12').innerHTML = getValue(lk1 * 1.258 - lPrim, 1);
	document.getElementById('bridles-cascade-b1').innerHTML = getValue(lk1 * 1.404 - lPrim, 1);
	document.getElementById('bridles-cascade-b2').innerHTML = getValue(lk1 * 1.368 - lPrim, 1);
	document.getElementById('bridles-cascade-b3').innerHTML = getValue(lk1 * 1.319 - lPrim, 1);
	document.getElementById('bridles-cascade-b4').innerHTML = getValue(lk1 * 1.255 - lPrim, 1);
	document.getElementById('bridles-cascade-b5').innerHTML = getValue(lk1 * 1.161 - lPrim, 1);
	document.getElementById('bridles-cascade-b6').innerHTML = getValue(lk1 * 0.983 - lPrim, 1);

}
function getValue(value, digits) {
	return new Number(value).toFixed(digits);
}

function setBridlesCascade(cascade) {
	bridlesCascade = cascade;
	if (cascade) {
		bridleLength = 15.421 * lk1 + 19 * knotloss;
		document.getElementById('bridles_choice_cascade').checked = true;
		document.getElementById('bridles_choice_classic').checked = false;
		document.getElementById('bridles_classic').style.display = 'none';
		document.getElementById('bridles_cascade').style.display = 'block';
	} else {
		bridleLength = 25.636 * lk1 + 19 * knotloss;
		document.getElementById('bridles_choice_classic').checked = true;
		document.getElementById('bridles_choice_cascade').checked = false;
		document.getElementById('bridles_classic').style.display = 'block';
		document.getElementById('bridles_cascade').style.display = 'none';
	}
	setDimensions();
}