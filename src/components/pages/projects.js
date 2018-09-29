import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';


class Projects extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1 style={{position: "fixed", top:"10%", left:"45%"}}>
                    Projects
                </h1>

                <h3 style={{position: "fixed", top:"20%", left:"10%"}}> 
                    Dijkstra
                </h3>
                <p style={{position: "fixed", top:"27%", left:"4%"}}>
                    <Link to="/Projects/Dijkstra">Dijkstra (Build your own graph)</Link>
                </p>
                <p style={{position: "fixed", top:"32%", left:"4.5%"}}>
                    <Link to="/Projects/DijkstraDefault">Dijkstra (Use a default graph)</Link>
                </p>
                <p style={{position:"fixed", top:"37%", left:"7%"}}>
                    <Link to="/Projects/DijkstraExplanation">Project Explanation</Link>
                </p>

                <h3 style={{position: "fixed", top:"40%", left:"9%"}}> 
                    Kruskal's
                </h3>
                <p style={{position: "fixed", top:"47%", left:"8%"}}>
                    (Coming soon)
                </p>

                 <h3 style={{position: "fixed", top:"60%", left:"10%"}}> 
                    Prim's
                </h3>
                <p style={{position: "fixed", top:"67%", left:"8%"}}>
                    (Coming soon)
                </p>

                <h3 style={{position: "fixed", top:"20%", left:"40%"}}> 
                    RSA
                </h3>
                <p style={{position: "fixed", top:"27%", left:"34%"}}>
                    (Coming by Oct 9, 2018)
                </p>


            </div>
    );
  }
}

export default Projects;
