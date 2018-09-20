import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

function Circle(x, y, dx, dy, radius, canvas, context) {
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.radius = radius;

   this.draw = function() {
     context.beginPath(); //Makes it so previous lines won't be drawn to the new circle
     context.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // x, y, radius, start angle, end angle
     context.strokeStyle = 'orange';
     context.stroke();
   }

   this.update = function() {
     if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
     this.dx*=-1;
     }
     this.x += this.dx;

     if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
       this.dy*=-1;
     }
     this.y += this.dy;

     this.draw();
   }
}

class BouncingCircles extends Component {

  componentDidMount() {
    this.initializeCanvas();
  }

  initializeCanvas() {
    var canvas = this.refs.canvas
    var context = canvas.getContext('2d');

    var circleArray = [];
    for(var i = 0; i < 100; i++) {
      let radius = 30;
      let x = Math.random() * (canvas.width - radius * 2) + radius;
      let y = Math.random() * (canvas.height - radius * 2) + radius;
      let dx = (Math.random() - 0.5) * 8;
      let dy = (Math.random() - 0.5) * 8;
      circleArray.push(new Circle(x, y, dx, dy, radius, canvas, context));
    }

    function animate() {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < circleArray.length; i++) {
          circleArray[i].update();
        }
    }

    animate(canvas, context);


  }

  render() {
    return (
        <div>
          <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight - 80} />
        </div>
    );
  }

}

export default BouncingCircles;


