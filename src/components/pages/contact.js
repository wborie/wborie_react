import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from '../../Assets/Images/Logo.png';
import linkedInLogo from '../../Assets/Images/LinkedIn.png';
import githubLogo from '../../Assets/Images/Github.png';

class Contact extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div style={{textAlign:"center", position:"relative", top:"30px"}}>
                    <p style={{fontSize:"36px"}}>
                        Contact Info
                    </p>
                </div>
                <div style={{position:"relative", top:"60px"}}>
                    <p>
                        Email: borie@usc.edu
                    </p>
                    <div style = {{position:"relative"}}>
                        <a href = "https://www.linkedin.com/in/will-borie-784011156/">
                        <img src = {linkedInLogo} style = {{width:"50px", height:"50px"}}/>
                        </a>
                        <div style = {{position:"absolute", top: "14px", left: "60px"}}>
                            <a href="https://www.linkedin.com/in/will-borie-784011156/">https://www.linkedin.com/in/will-borie-784011156/</a>
                        </div>
                    </div>
                    <div style = {{position:"relative", top:"10px"}}>
                        <a href = "https://github.com/wborie/">
                        <img src = {githubLogo} style = {{width:"50px", height:"50px"}}/>
                        </a>
                        <div style = {{position:"absolute", top: "14px", left: "60px"}}>
                            <a href="https://github.com/wborie/">https://github.com/wborie/</a>
                        </div>
                    </div>
                </div>

                
                
            </div>
        );
    }
}

export default Contact;
