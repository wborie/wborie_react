import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';


class Projects extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 style={{position: "fixed", top:"12%", left:"45%"}}>
          Projects
        </h1>

        <h3 style={{position: "fixed", top:"20%", left:"10%"}}> 
          Dijkstra
        </h3>
        <p  style={{position: "fixed", top:"29%", left:"4%"}}>
          <Link to="/Projects/Dijkstra">Dijkstra (Build your own graph)</Link>
        </p>
        <p  style={{position: "fixed", top:"35%", left:"4.5%"}}>
          <Link to="/Projects/DijkstraDefault">Dijkstra (Use a default graph)</Link>
        </p>
      </div>
    );
  }
}

export default Projects;
