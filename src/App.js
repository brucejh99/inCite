import React, { Component } from 'react';
import './App.css';

import Launch from './components/Launch';
import Citation from './components/Citation';
import Bibliography from './components/Bibliography';

const addIcon = require('./assets/add-icon.png');

export default class App extends Component {
  constructor() {
    super();
    this.updateName = this.updateName.bind(this);
    this.homePage = this.homePage.bind(this);
    this.customizePage = this.customizePage.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.state = {
      bibName: null,
      citation: true,
      bibliography: false,
      style: null,
    }
  }

  updateName(e) {
    if(e.key === 'Enter') {
      this.setState({
        bibName: e.target.value,
      });
      console.log(`Updated name to ${e.target.value}`);
    }
  }

  updateStyle(newStyle) {
    this.setState({
      style: newStyle,
    })
    console.log(`Style updated to ${newStyle}`);
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
          <button className="customize-button" onClick={this.customizePage}>
              <img src={addIcon} className="customize-button" alt="add-icon" />
          </button>
        </div>
        {(this.state.bibName === null) || (this.state.style === null) ?
          <Launch updateName={this.updateName} value={this.bibName} updateStyle={this.updateStyle}/> :
            (this.state.citation ? <Citation /> : <Bibliography />)}
          <p>{`Current style: ${this.state.style} (for development purposes, remove on release)`}</p>
      </div>
    );
  }
}
