function rotate(id,angle,whence) {
	var p = id;
	if (!whence) {
		p.angle = ((p.angle==undefined?0:p.angle) + angle) % 360;
	} else {
		p.angle = angle;
	}
	if (p.angle >= 0) {
		var rotation = Math.PI * p.angle / 180;
	} else {
		var rotation = Math.PI * (360+p.angle) / 180;
	}
	var costheta = Math.cos(rotation);
	var sintheta = Math.sin(rotation);
	if (document.all && !window.opera) {
		var canvas = document.createElement('img');
		canvas.src = p.src;
		canvas.height = p.height;
		canvas.width = p.width;
		canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M1
2="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
	} else {
		var canvas = document.createElement('canvas');
		if (!p.oImage) {
			canvas.oImage = new Image();
			canvas.oImage.src = p.src;
		} else {
			canvas.oImage = p.oImage;
		}
canvas.style.width = canvas.width = Math.abs(costheta*canvas.oImage.width) +
 Math.abs(sintheta*canvas.oImage.height);
canvas.style.height = canvas.height = Math.abs(costheta*canvas.oImage.height) +
 Math.abs(sintheta*canvas.oImage.width);
		var context = canvas.getContext('2d');
		context.save();
		if (rotation <= Math.PI/2) {
			context.translate(sintheta*canvas.oImage.height,0);
		} else if (rotation <= Math.PI) {
			context.translate(canvas.width,-costheta*canvas.oImage.height);
		} else if (rotation <= 1.5*Math.PI) {
			context.translate(-costheta*canvas.oImage.width,canvas.height);
		} else {
			context.translate(0,-sintheta*canvas.oImage.width);
		}
		context.rotate(rotation);
		context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
		context.restore();
	}
	canvas.id = p.id;
	canvas.angle = p.angle;
	p.parentNode.replaceChild(canvas, p);
}
function rotateRight(id,angle) {
	rotate(id,angle==undefined?90:angle);
}
function rotateLeft(id,angle) {
	rotate(id,angle==undefined?-90:-angle);
}