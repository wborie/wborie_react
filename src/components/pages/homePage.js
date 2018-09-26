import React, { Component } from 'react';
import Background1 from '../../Assets/Images/Motherboard.jpg';
import Me from '../../Assets/Images/Me2.jpeg';

class Homepage extends Component {

    render() {
        return (
            <div className="container-fluid">
                <img src = {Background1} style={{position:"fixed", top:"80px", left:"0%", width:"100%", height:"100%",zIndex:"-1"}}/>
                <div style={{position:"fixed", top:"160px", left:"60%", textAlign:"center", width:"400px"}}>
                    <img src = {Me} style={{width:"250px", height:"300px", border:"3px solid white"}} />
                    <div style={{position:"absolute", top:"340px"}}>
                        <p style = {{fontSize: "30px",fontFamily: "Georgia", fontWeight:"500", color:"#ED2A72", 
                        lineHeight:"50px", backgroundColor:"black", border:"3px solid white"}}>
                        Hello! My name is Will and I'm a Computer Science student at USC.
                        </p>
                    </div> 
                </div>
            </div>
        );
    }
}

export default Homepage;
