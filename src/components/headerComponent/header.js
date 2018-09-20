import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Images/Logo.png';

class Header extends Component {
  render() {
    return (
      <header>

        <div className="logo">
           <img src={logo} alt={"logo"} width="110px" height = "80px"/>
        </div>

        <nav>
          <ul>
            <li className="first">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Projects">Projects</Link>
            </li>
            <li>
              <Link to="/Resume">Resume</Link>
            </li>
            <li>
              <Link to="/About">About Me</Link>
            </li>
            <li className="last">
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>

      </header>
    );
  }
}

export default Header;
