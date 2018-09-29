import React, { Component } from 'react';

class DijkstraExplanation extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div style={{textAlign:"center"}}>
                    <h1> Instructions </h1>
                    <p> The Dijkstra project allows users to create their own graph and run Dijkstra's algorithm
                    to find the shortest path from a node to any other node in the graph. To add a node, enter a name in the
                    "Add a node" text box and press enter. To remove a node, click on the "Add" button and then enter a name
                    in the "Remove a node" text box before pressing enter. To add an edge connecting two nodes, enter the names
                    of the two nodes in the "add an edge from" text boxes and then enter an edge weight in the "with a weight of"
                    text box. If there are valid values in all three text boxes (weights must be real numbers and nodes chosen must
                    exist), an edge will be created. To remove an edge, click on the "Add" edge button and then follow the same 
                    procedure as for adding an edge. To update an edge's weight, follow the same procedure as for adding an edge but
                    enter your new edge weight. To find the shortest path from one node to the rest of the graph, enter the name of
                    the start node in the "Run Dijkstra from" text box at the bottom of the page and press enter. An animation of the 
                    algorithm should then play. To move nodes, first click on the "View Mode" button. Then click on any node and move
                    your mouse to where you want to place the node. Click again to place the node. If the node is greyed out, the
                    desired location is invalid (because it is too close to another node). Click on the "Move nodes mode" button to
                    change back to view mode.

                    </p>
                    <h1> How it works </h1>
                    <p> All of the visual elements of this project are written in Javascript using HTML canvas. When the algorithm
                    is run, data from the user generated graph is sent to a PHP script on a virtual server for formatting before 
                    being forwarded to a pre-compiled C++ program on the server that executes Dijkstra's algorithm. The resulting 
                    data is then processed by the Javascript front-end to display an animation of the algorithm. </p>
                </div>
            </div>
    );
  }
}

export default DijkstraExplanation;
