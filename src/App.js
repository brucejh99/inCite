import React, { Component } from 'react';
import './App.css';

import Launch from './components/Launch';
import Citation from './components/Citation';
import Bibliography from './components/Bibliography';

const addIcon = require('./assets/add-icon.png');

export default class App extends Component {
  constructor() {
    super();
    this.homePage = this.homePage.bind(this);
    this.customizePage = this.customizePage.bind(this);
    this.state = {
      bibName: null,
      citation: true,
      bibliography: false,
    }
  }

  homePage() {
    this.setState({
      citation: true,
      bibliography: false,
    });
  }

  customizePage() {
    this.setState({
      citation: false,
      bibliography: true,
    });
  }

  render() {
    return (
      <div>
        <div className="customize-bar">
          <button className="customize-button" onClick={this.homePage}>
              <img src={addIcon} className="customize-button" alt="add-icon" />
          </button>
          <button className="customize-button" onClick={this.customizePage}>
              <img src={addIcon} className="customize-button" alt="add-icon" />
          </button>
        </div>
        {this.state.bibName ? <Launch /> : (this.state.citation ? <Citation /> : <Bibliography />)}
      </div>
    );
  }
}
