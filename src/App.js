import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import Settings from './components/Settings';
// import Customize from './components/AddRemoveMedia';

const homeIcon = require('./assets/home-icon.png')
const addIcon = require('./assets/add-icon.png');
const settingsIcon = require('./assets/settings-icon.png');

export default class App extends Component {
  constructor() {
    super();
    this.loadSettings = this.loadSettings.bind(this);
    this.state = {
      home: true,
      settings: false,
      customize: false,
    }
  }

  loadSettings() {
    this.setState({
      home: false,
      settings: true,
      customize: false,
    });
    console.log(this);
  }

  render() {
    return (
      <div>
        <div className="customize-bar">
          <CustomizeButton icon={homeIcon} handleClick={ () => console.log('Home') } />
          <CustomizeButton icon={addIcon} handleClick={ () => console.log('Add') } />
          <button className="customize-button" onClick={this.loadSettings}>
              <img src={settingsIcon} className="customize-button" alt="add-icon" />
          </button>
        </div>
        {this.state.home ? <Home /> : <Settings />}
      </div>
    );
  }
}

class CustomizeButton extends Component {
  constructor(props) {
    super(props);
    this.icon = props.icon;
    this.handleClick = props.handleClick;
  }

  render() {
    return (
      <button className="customize-button" onClick={this.handleClick}>
          <img src={this.icon} className="customize-button" alt="add-icon" />
      </button>
    )
  }
}
