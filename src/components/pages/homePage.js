import React, { Component } from 'react';
import Background1 from '../../Assets/Images/Me.jpg';

class Homepage extends Component {

    render() {
        return (
            <div className="container-fluid">
                <img src = {Background1} style={{position:"fixed", top:"80px", left:"0%", width:"100%", height:"100%",zIndex:"-1"}}/>
                <div style= {{width:"400px",textAlign:"center"}}>
                    <p style = {{fontSize: "40px",fontFamily: "Georgia", fontWeight:"500", color:"white", 
                    lineHeight:"60px", position:"fixed",top:"15%",left:"15%",width:"400px"}}>
                    Will Borie
                    </p>
                    <p style = {{fontSize: "40px",fontFamily: "Georgia", fontWeight:"500", color:"white", 
                    lineHeight:"60px", position:"fixed",top:"15%",left:"45%",width:"600px"}}>
                    Computer Science Student at USC
                    </p>
                </div>
            </div>
        );
    }
}

export default Homepage;
