import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from '../../Assets/Images/Logo.png';

class Contact extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>
          Contact Info
        </h1>

        <p>
          Email: borie@usc.edu
        </p>
        <p>
          Phone: (650) 739-5996
        </p>
        <a href="https://www.linkedin.com/in/will-borie-784011156/">LinkedIn Profile</a>
      </div>
    );
  }
}

export default Contact;
