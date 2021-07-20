/**@type {HTMLCanvasElement} */
const canvas = document.querySelector('.canvas1');
const generateTreeButton = document.querySelector('.generate-tree-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve1;
let curve2;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
	ctx.beginPath();
	ctx.save();
	ctx.strokeStyle = color1;
	ctx.fillStyle = color2;
	ctx.lineWidth = branchWidth;
	ctx.shadowBlur = 5;
	ctx.shadowColor = 'rgba(0,0,0,0.8)';
	ctx.translate(startX, startY);
	ctx.rotate((angle * Math.PI) / 180);
	ctx.moveTo(0, 0);
	// ctx.lineTo(0, -len);
	if (angle > 0) {
		ctx.bezierCurveTo(curve2, -len / 2, curve2, -len / 2, 0, -len);
	} else {
		ctx.bezierCurveTo(-curve2, -len / 2, -curve2, -len / 2, 0, -len);
	}
	ctx.stroke();

	if (len < 4) {
		// leafs
		ctx.beginPath();
		ctx.arc(0, -len, 10, 0, Math.PI / 2);
		ctx.fill();
		// restore will bring back the most recent canvas save from drawing state stack
		ctx.restore();
		// if len values is less than 10 stop recursion and return
		return;
	}

	drawTree(0, -len, len * 0.75, angle + curve1, branchWidth * 0.5);
	drawTree(0, -len, len * 0.75, angle - curve1, branchWidth * 0.5);
	ctx.restore();
}

// drawTree(canvas.width / 2, canvas.height - 80, 130, 0, 20, 'brown', 'pink');

function generateRandomTree() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let centerPointX = canvas.width / 2;
	let centerPointY = canvas.height - 80;
	let len = Math.floor(Math.random() * 20 + 150);
	let angle = 0;
	let branchWidth = Math.random() * 70 + 1;
	let color1 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
	let color2 = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
	curve1 = Math.random() * 10 + 20;
	curve2 = Math.random() * 50;
	generateTreeButton.style.background = color1;

	drawTree(centerPointX, centerPointY, len, angle, branchWidth, color1, color2);
}

generateTreeButton.addEventListener('click', generateRandomTree);
