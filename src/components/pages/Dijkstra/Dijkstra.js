import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './../../../Assets/css/Dijkstra.min.css'

const moveNodeKey = "m";

const viewMode = "mode-view";
const moveNodesMode = "mode-moveNodes";
const placeNodeAttemptLimit = 1000;

function Node(name, x, y, innerRadius, outerRadius, color, canvas, context,) {
    this.x = x;
    this.y = y;
    this.isSelected = false;
    this.isMoving = false;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.color = color;
    this.canvas = canvas;
    this.context = context;
    this.canBePlaced = true;
    this.name = name;

    this.draw = function() {
        this.context.beginPath(); // Makes it so previous lines won't be drawn to the new circle
        for(let i = 0; i <= (this.outerRadius - this.innerRadius); i++) {
            this.context.arc(this.x, this.y, this.innerRadius + i, 0, Math.PI * 2);
        }

        if (this.isSelected) { 
            for(let i = 1; i <= 2; i++) {
                this.context.arc(this.x, this.y, this.outerRadius + i, 0, Math.PI * 2);
            }
        }
        this.context.strokeStyle = this.color;
        this.context.stroke();

        this.context.font = "10px Arial"
        this.context.fillStyle = "black";
        this.context.fillText(this.name, this.x, this.y);
    }

    this.select = function () {
        this.isSelected = true;
    }

    this.deselect = function() {
        this.isSelected = false;
    }

    this.allowMoving = function () {
        this.isMoving = true;
    }

    this.stopMoving = function () {
        this.isMoving = false;
    }

    this.updateColor = function(newColor) {
        this.color = newColor;
    }
}

function Edge(startNode, endNode, weight, color, context, outerNodeRadius, id) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.weight = weight;
    this.color = color;
    this.context = context;
    this.outerNodeRadius = outerNodeRadius;
    this.id = id;
    this.isHighlighted = false;
    this.highlightColor = "rgba(0,0,255,0.5)";

    this.draw = function() {
        let centerXDiff = this.endNode.x - this.startNode.x;
        let centerYDiff = (this.endNode.y - this.startNode.y);
        let theta = Math.atan(centerYDiff / centerXDiff);
        let radiusXStart = (centerXDiff >= 0) ? (this.outerNodeRadius * Math.cos(theta)) + 
            this.startNode.x : this.startNode.x - (this.outerNodeRadius * Math.cos(theta));
        let radiusYStart = (centerXDiff >= 0) ? (this.outerNodeRadius * Math.sin(theta)) + 
            this.startNode.y : this.startNode.y - (this.outerNodeRadius * Math.sin(theta));
        let radiusXEnd = (centerXDiff < 0) ? (this.outerNodeRadius * Math.cos(theta)) + 
            this.endNode.x : this.endNode.x - (this.outerNodeRadius * Math.cos(theta));
        let radiusYEnd = (centerXDiff < 0) ? (this.outerNodeRadius * Math.sin(theta)) + 
            this.endNode.y : this.endNode.y - (this.outerNodeRadius * Math.sin(theta));

        this.context.beginPath();
        this.context.moveTo(radiusXStart, radiusYStart);
        this.context.lineTo(radiusXEnd, radiusYEnd);
        this.context.strokeStyle = this.isHighlighted ? this.highlightColor : this.color;

        this.context.lineWidth = this.isHighlighted ? 6 : 3; 
        this.context.stroke();
        this.context.lineWidth = 1;


        this.context.font = "15px Arial"
        this.context.fillStyle = "black";
        this.context.fillText(this.weight, this.startNode.x + (centerXDiff / 2), this.startNode.y + (centerYDiff / 2));
    }

    this.highlight = function () {
        this.isHighlighted = true;
    }

    this.unHighlight = function () {
        this.isHighlighted = false;
    }

    this.updateHighlightColor = function (newColor) {
        this.highlightColor = newColor;
    }
}

class Dijkstra extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            nodeMap: null,
            edgeMap: new Map(),
            selectedNodeName: null, 
            innerNodeRadius: 30,
            outerNodeRadius: 32,
            minDistanceBetweenNodes: 20, 
            nodeColor: "rgba(0,0,0,1)",
            mode: viewMode,
            canvas: null,
            context: null,
            nodeName: '',
            edgeFrom: '',
            edgeTo: '',
            edgeWeight: '',
            addRemoveNodeSwitch: "Add",
            addRemoveEdgeSwitch: "Add",
            dijkstraStart: '',
            dijkstraResult: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.initializeCanvas();
    }

    initializeCanvas() {
        var canvas = this.refs.canvas;
        var context = canvas.getContext('2d');
        let newNodeMap = new Map();
        this.setState({ canvas: canvas, context: context, nodeMap: newNodeMap });
        let currentProject = this;
        let outOfSpace = false;
        canvas.addEventListener('click', function(event) { currentProject.onClick(event, newNodeMap) }, false);
        document.addEventListener('keypress', function(event) { currentProject.onKeyPress(event, newNodeMap) }, false);
        canvas.addEventListener('mousemove', function(event) { currentProject.onMouseMove(event, newNodeMap) }, false);
        this.drawCanvas(newNodeMap, canvas, context);
    }

    onClick(event, nodeMap) {
        this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
        for(let [key, value] of nodeMap) {
            if (Math.sqrt(Math.pow(event.layerX - value.x, 2) + Math.pow(event.layerY - value.y, 2)) 
                <= value.outerRadius) { // Clicked on a node
                if (nodeMap.get(this.state.selectedNodeName) != key && nodeMap.get(this.state.selectedNodeName) != null) {
                    nodeMap.get(this.state.selectedNodeName).deselect();
                }
                value.select();
                this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
                this.setState({ selectedNodeName: key });
            }
            else {
                value.deselect();
                this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
                if (this.state.selectedNodeName == value.name) this.setState({ selectedNodeName: null });
            }
        }
        if (this.state.selectedNodeName != null && this.state.mode == moveNodesMode) { // Allow the selected node to move if the moveNodeKey has been pressed
            if (!nodeMap.get(this.state.selectedNodeName).isMoving) {
                nodeMap.get(this.state.selectedNodeName).allowMoving();
                this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
            }
            else if (nodeMap.get(this.state.selectedNodeName).canBePlaced) {
                nodeMap.get(this.state.selectedNodeName).stopMoving();
                nodeMap.get(this.state.selectedNodeName).deselect();
                this.setState({ selectedNodeName: null });
                this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
            }
            else console.log("Can't place here");
        }
    }

    onKeyPress(event, nodeMap) {
        if (event.key == moveNodeKey && this.state.selectedNodeName != null) { // Allow the selected node to move if the moveNodeKey has been pressed
            if (!nodeMap.get(this.state.selectedNodeName).isMoving) {
                nodeMap.get(this.state.selectedNodeName).allowMoving();
                this.setState({ mode: moveNodesMode });
                this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
            }
            else if (nodeMap.get(this.state.selectedNodeName).canBePlaced) {
                nodeMap.get(this.state.selectedNodeName).stopMoving();
                nodeMap.get(this.state.selectedNodeName).deselect();
                this.setState({ selectedNodeName: null, mode: viewMode });
                this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
            }
            else console.log("Can't place here");
        }
        this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
    }

    onMouseMove(event, nodeMap) {
        if (this.state.selectedNodeName != null && nodeMap.get(this.state.selectedNodeName).isMoving) { // Move the selected node if it is in move mode
            if (this.newNodePositionIsLegal(nodeMap, event.layerX, event.layerY, this.state.canvas, this.state.context)) {
                nodeMap.get(this.state.selectedNodeName).x = event.layerX;
                nodeMap.get(this.state.selectedNodeName).y = event.layerY;
                nodeMap.get(this.state.selectedNodeName).updateColor(this.state.nodeColor);
                nodeMap.get(this.state.selectedNodeName).canBePlaced = true;
            }
            else if (!this.newNodePositionIsOutOfBounds(event.layerX, event.layerY, this.state.canvas)) {
                nodeMap.get(this.state.selectedNodeName).x = event.layerX;
                nodeMap.get(this.state.selectedNodeName).y = event.layerY;
                let currentColor = nodeMap.get(this.state.selectedNodeName).color;
                let newColor = currentColor.substring(0, currentColor.lastIndexOf(",") + 1) + "0.2)";
                nodeMap.get(this.state.selectedNodeName).updateColor(newColor);
                nodeMap.get(this.state.selectedNodeName).canBePlaced = false;
            }
            else {
                if (!(event.layerY < this.state.outerNodeRadius || event.layerY >= 
                    this.state.canvas.height - this.state.outerNodeRadius))
                    nodeMap.get(this.state.selectedNodeName).y = event.layerY;
                if (!(event.layerX >= this.state.canvas.width - this.state.outerNodeRadius || event.layerX < 
                    this.state.outerNodeRadius))
                    nodeMap.get(this.state.selectedNodeName).x = event.layerX;
                if (!this.newNodePositionIsTooCloseToOtherNodes(nodeMap, nodeMap.get(this.state.selectedNodeName).x, 
                    nodeMap.get(this.state.selectedNodeName).y, this.state.canvas, this.state.context)) {
                    nodeMap.get(this.state.selectedNodeName).updateColor(this.state.nodeColor);
                    nodeMap.get(this.state.selectedNodeName).canBePlaced = true;
                }
                else {
                    let currentColor = nodeMap.get(this.state.selectedNodeName).color;
                    let newColor = currentColor.substring(0, currentColor.lastIndexOf(",") + 1) + "0.2)";
                    nodeMap.get(this.state.selectedNodeName).updateColor(newColor);
                    nodeMap.get(this.state.selectedNodeName).canBePlaced = false;
                }
            }
            this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
        }

    }

    drawCanvas(nodeMap, canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawEdges(nodeMap, canvas, context);
        this.drawNodes(nodeMap, canvas, context);
        // this.drawMode(nodeMap, canvas, context);
    }

    drawMode(nodeMap, canvas, context) {
        context.font = "20px Arial"
        context.fillStyle = "black";
        if (this.state.mode == viewMode) {
            context.fillText("View Mode", 5, canvas.height - 5);
        }
        else if (this.state.mode == moveNodesMode) {
            context.fillText("Move Nodes Mode", 5, canvas.height - 5);
        }
    }

    drawNodes(nodeMap, canvas, context) {
        for(let [key, value] of nodeMap) {
            value.draw();
        }
    }

    drawEdges(nodeMap, canvas, context) {
        for(let [key, value] of this.state.edgeMap) {
            value.draw();
        }
    }

    newNodePositionIsLegal(nodesToCheck, x, y, canvas, context) {
        if (this.newNodePositionIsOutOfBounds(x, y, canvas)) return false;
        return !(this.newNodePositionIsTooCloseToOtherNodes(nodesToCheck, x, y, canvas, context));
    }

    newNodePositionIsOutOfBounds(x, y, canvas) {
        if (x >= canvas.width - this.state.outerNodeRadius || x < this.state.outerNodeRadius || 
            y >= canvas.height - this.state.outerNodeRadius || y < this.state.outerNodeRadius) return true;
        else return false;
    }

    newNodePositionIsTooCloseToOtherNodes(nodesToCheck, x, y, canvas, context) {
        for(let [key, value] of nodesToCheck) {
            if (key != this.state.selectedNodeName) {
                if (Math.sqrt(Math.pow(x - value.x, 2) + Math.pow(y - value.y, 2)) 
                    <= (this.state.outerNodeRadius * 2) + this.state.minDistanceBetweenNodes) {
                    return true;
                }
            }
        }
        return false;
    }

    handleChange(event) {
        if (event.target.name == "addNode") this.setState({nodeName: event.target.value});
        else if (event.target.name == "addEdgeFrom") this.setState({edgeFrom: event.target.value});
        else if (event.target.name == "addEdgeTo") this.setState({edgeTo: event.target.value});
        else if (event.target.name == "addEdgeWeight") this.setState({edgeWeight: event.target.value});
        else if (event.target.name == "dijkstraStart") this.setState({dijkstraStart: event.target.value});
    }

    handleSubmit(event) {
        if (event.target.name == "addNode") {
            let newNodeName = this.state.nodeName;
            if (this.state.addRemoveNodeSwitch == "Add") {
                if (!this.state.nodeMap.has(newNodeName)) {
                    let innerRadius = this.state.innerNodeRadius;
                    let outerRadius = this.state.outerNodeRadius; // !!!!! Update this to be set by user !!!!!
                    let x, y;
                    let count = 0;
                    do {
                        if (count > placeNodeAttemptLimit) {
                            break;
                        }
                        x = Math.random() * (this.state.canvas.width - outerRadius * 2) + outerRadius;
                        y = Math.random() * (this.state.canvas.height - outerRadius * 2) + outerRadius;
                        count++;
                    } 
                    while (!this.newNodePositionIsLegal(this.state.nodeMap, x, y, this.state.canvas, this.state.context));

                    let newNode = new Node(newNodeName, x, y, innerRadius, outerRadius, this.state.nodeColor, this.state.canvas, this.state.context);
                    this.state.nodeMap.set(newNodeName, newNode);
                }
                this.drawCanvas(this.state.nodeMap, this.state.canvas, this.state.context);
            }
            else {
                this.state.nodeMap.delete(newNodeName);
                if (this.state.selectedNodeName == newNodeName) 
                    this.setState({ selectedNodeName: null});
                for(let [key, value] of this.state.edgeMap) {
                    if (value.startNode.name == newNodeName || value.endNode.name == newNodeName)
                        this.state.edgeMap.delete(key);   
                }
                this.drawCanvas(this.state.nodeMap, this.state.canvas, this.state.context);
            }
        }
        else if (event.target.name == "addEdgeFrom" || event.target.name == "addEdgeTo" || event.target.name == "addEdgeWeight") {
            if (this.state.nodeMap.has(this.state.edgeFrom) && this.state.nodeMap.has(this.state.edgeTo) &&
                !isNaN(parseFloat(this.state.edgeWeight))) {
                let startNode = this.state.nodeMap.get(this.state.edgeFrom);
                let endNode = this.state.nodeMap.get(this.state.edgeTo);
                if (this.state.addRemoveEdgeSwitch == "Add") {
                    let editedExisting = false;
                    for(let [key, value] of this.state.edgeMap) {
                        if ((value.startNode == startNode && value.endNode == endNode) || 
                            (value.endNode == startNode && value.startNode == endNode)) {
                            value.weight = this.state.edgeWeight;
                            editedExisting = true;
                        }
                    }
                    if (!editedExisting) {
                        let edgeId = startNode.name + "-" + endNode.name;
                        this.state.edgeMap.set(edgeId, new Edge(startNode, endNode, this.state.edgeWeight, "rgba(0,255,0,1)", 
                            this.state.context, this.state.outerNodeRadius, edgeId));
                    }
                    this.drawCanvas(this.state.nodeMap, this.state.canvas, this.state.context);
                }
                else {
                    let firstKey = startNode.name + "-" + endNode.name;
                    let secondKey = endNode.name + "-" + startNode.name;
                    this.state.edgeMap.delete(firstKey);
                    this.state.edgeMap.delete(secondKey);
                    this.drawCanvas(this.state.nodeMap, this.state.canvas, this.state.context);
                }
            }
        }
        else if (event.target.name == "Add-RemoveNodeSwitch") {
            if (this.state.addRemoveNodeSwitch == "Add")
                this.setState({ addRemoveNodeSwitch: "Remove" });
            else
                this.setState({ addRemoveNodeSwitch: "Add"});
        }
        else if (event.target.name == "Add-RemoveEdgeSwitch") {
            if (this.state.addRemoveEdgeSwitch == "Add")
                this.setState({ addRemoveEdgeSwitch: "Remove"});
            else
                this.setState({ addRemoveEdgeSwitch: "Add"});
        }
        else if (event.target.name == "dijkstraStart") {
            if (this.state.nodeMap.has(this.state.dijkstraStart)) {
                this.executeDijkstra(this.state.nodeMap, this.state.edgeMap, this.state.nodeMap.get(this.state.dijkstraStart));
            }
        }
        else if (event.target.name == "SwitchModeButton") {
            if (this.state.selectedNodeName != null && this.state.mode == moveNodesMode) {
                this.state.nodeMap.get(this.state.selectedNodeName).stopMoving();
                this.state.nodeMap.get(this.state.selectedNodeName).deselect();    
            }
            else if (this.state.selectedNodeName != null && this.state.mode == viewMode) {
                if (!this.state.nodeMap.get(this.state.selectedNodeName).isMoving) {
                    this.state.nodeMap.get(this.state.selectedNodeName).allowMoving();
                }
            }
            this.drawCanvas(this.state.nodeMap, this.state.canvas, this.state.context);

            if (this.state.mode == viewMode) this.setState({ mode: moveNodesMode});
            else this.setState({ mode: viewMode });
        }
        event.preventDefault();
    }

    callApi = async(dijkstraPackage) => {
        let result = await fetch("http://www.willborie.com/site_api/dijkstra.php", {method: "POST", headers: {"Accept": "application/json"}, 
            body: dijkstraPackage})
            .then(response => response.json())
            .catch(error => console.log(error))
            ;
        return result;
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    executeDijkstra = async(nodeMap, edgeMap, startNode) => { // the problem might be that this function isn't asynchronous?
        for(let [key, value] of this.state.edgeMap) {
            value.unHighlight();
        }
        this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
        let nodeList = [];
        let edgeList = [];
        for(let [key, value] of nodeMap) {
            nodeList.push(key);     
        }
        for(let [key, value] of edgeMap) {
            edgeList.push(key + "|" + value.weight);     
        }
        let dijkstraPackage = JSON.stringify({nodes: nodeList, edges: edgeList, startNodeName: startNode.name});
        let dijkstraResult = await this.callApi(dijkstraPackage);
        console.log(dijkstraResult);
        let currentEdge, overridenEdgeName;
        for(let i = 0; i < dijkstraResult.traversalOrder1.length; i++) {
            await this.sleep(500);
            currentEdge = this.state.edgeMap.get(dijkstraResult.traversalOrder1[i]);
            if (currentEdge == null) currentEdge = this.state.edgeMap.get(dijkstraResult.traversalOrder2[i]);
            if (i != 0) currentEdge.updateHighlightColor("rgba(0,0,255,0.5)");
            currentEdge.updateHighlightColor("rgba(255,0,0,0.5)");
            currentEdge.highlight();

            overridenEdgeName = dijkstraResult.parentOverrideTracker1[i];
            if (overridenEdgeName != "") {
                let overridenEdge = this.state.edgeMap.get(dijkstraResult.parentOverrideTracker1[i]);
                if (overridenEdge == null) overridenEdge = this.state.edgeMap.get(dijkstraResult.parentOverrideTracker2[i]);
                overridenEdge.unHighlight();
            }
            this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
            currentEdge.updateHighlightColor("rgba(0,0,255,0.5)");
        }
        await this.sleep(500);
        this.drawCanvas(nodeMap, this.state.canvas, this.state.context);

        // await this.sleep(10000);
        // for(let [key, value] of this.state.edgeMap) {
        //     value.unHighlight();
        // }
        // this.drawCanvas(nodeMap, this.state.canvas, this.state.context);
        // console.log(dijkstraResult);
    }

    render() {
        let displayWeight = (this.state.addRemoveEdgeSwitch == "Add") ? "inline-block" : "none";
        let currentMode = (this.state.mode == viewMode) ? "View Mode" : "Move nodes mode";
        return (
            <div>
                <div style={{backgroundColor: "lightblue", width: window.innerWidth, height: "50px"}}>
                    <form name = "Add-RemoveNodeSwitch" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "10px", display: "inline-block"}}>
                        <label>
                            <input name = "Add-RemoveNodeSwitch" type = "submit" value = {this.state.addRemoveNodeSwitch}
                            style = {{width: "90px"}}/>
                        </label>
                    </form>
                    <p style={{paddingLeft: "5px", display: "inline-block"}}> a node </p>
                    <form name = "addNode" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "10px", display: "inline-block"}}>
                        <label>
                            <input name = "addNode" type = "text" value = {this.state.nodeName} onChange = {this.handleChange} 
                            style = {{width: "60px"}}/>
                        </label>
                    </form>
                    <form name = "Add-RemoveEdgeSwitch" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "100px", display: "inline-block"}}>
                        <label>
                            <input name = "Add-RemoveEdgeSwitch" type = "submit" value = {this.state.addRemoveEdgeSwitch}
                            style = {{width: "90px"}}/>
                        </label>
                    </form>
                    <p style={{paddingLeft: "5px", display: "inline-block"}}> an edge from </p>
                    <form name = "addEdgeFrom" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "5px", display: "inline-block"}}>
                        <label>
                            <input name = "addEdgeFrom" type = "text" value = {this.state.edgeName} onChange = {this.handleChange} 
                            style = {{width: "60px"}}/>
                        </label>
                    </form>
                    <p style={{paddingLeft: "5px", display: "inline-block"}}> to </p>
                    <form name = "addEdgeTo" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "5px", display: "inline-block"}}>
                        <label>
                            <input name = "addEdgeTo" type = "text" value = {this.state.edgeName} onChange = {this.handleChange} 
                            style = {{width: "60px"}}/>
                        </label>
                    </form>
                    <p style={{paddingLeft: "5px", display: displayWeight}}> with a weight of </p>
                    <form name = "addEdgeWeight" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "5px", display: displayWeight}}>
                        <label>
                            <input name = "addEdgeWeight" type = "text" value = {this.state.edgeName} onChange = {this.handleChange} 
                            style = {{width: "60px"}}/>
                        </label>
                    </form>
                </div>
                <div>
                    <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight - 80 - 50 - 50}></canvas>
                </div>
                <div style = {{backgroundColor: "lightblue", width: window.innerWidth, height: "50px"}}>
                    <p style={{paddingTop: "10px", paddingLeft: "5px", display: "inline-block"}}> Run Dijkstra from </p>
                    <form name = "dijkstraStart" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "5px", display: "inline-block"}}>
                        <label>
                            <input name = "dijkstraStart" type = "text" value = {this.state.edgeName} onChange = {this.handleChange} 
                            style = {{width: "60px"}}/>
                        </label>
                    </form>
                    <form name = "SwitchModeButton" onSubmit={this.handleSubmit} style={{paddingTop: "10px", paddingLeft: "100px", display: "inline-block"}}>
                        <label>
                            <input name = "SwitchModeButton" type = "submit" value = {currentMode}
                            style = {{width: "200px"}}/>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default Dijkstra;


