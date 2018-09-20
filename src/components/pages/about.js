import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>
          About
        </h1>

        <p>
          Look at all of this nonexistent content!
        </p>
      </div>
    );
  }
}

export default About;
