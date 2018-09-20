import React, { Component } from 'react';

class Circle extends Component {

	constructor(props, x, y, dx, dy, radius) {
		super(props);
		this.state = {x: x, y: y, dx: dx, dy: dy};
		console.log(this.state);
	}



}


// function Circle(x, y, dx, dy, radius) {
// 	this.x = x;
// 	this.y = y;
// 	this.dx = dx;
// 	this.dy = dy;
// 	this.radius = radius;

// 	this.draw = function() {
// 		context.beginPath(); //Makes it so previous lines won't be drawn to the new circle
// 		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // x, y, radius, start angle, end angle
// 		context.strokeStyle = 'blue';
// 		context.stroke();
// 		// context.fill(); // Fill the circles
// 	}

// 	this.update = function() {
// 		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
// 		this.dx*=-1;
// 		}
// 		this.x += this.dx;

// 		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
// 			this.dy*=-1;
// 		}
// 		this.y += this.dy;

// 		this.draw();
// 	}
// }