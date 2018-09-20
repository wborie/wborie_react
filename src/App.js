import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import Projects from './components/pages/projects';
import Resume from './components/pages/resume';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Dijkstra from './components/pages/Dijkstra/Dijkstra';
import BouncingCircles from './components/pages/BouncingCircles';
import DijkstraDefault from './components/pages/Dijkstra/DijkstraDefault';

import './Assets/css/default.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Header />

          <Route exact path='/' component={Homepage} />
          <Route exact path='/Projects' component={Projects} />
          <Route exact path='/Resume' component={Resume} />
          <Route exact path='/About' component={About} />
          <Route exact path='/Contact' component={Contact} />
          <Route exact path='/Projects/Dijkstra' component={Dijkstra} />
          <Route exact path='/Secret/BouncingCircles' component={BouncingCircles} />
          <Route exact path='/Projects/DijkstraDefault' component={DijkstraDefault} />

        </div>
      </Router>
    );
  }
}

export default App;
