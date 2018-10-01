import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
// import Settings from './components/Settings';
// import Customize from './components/AddRemoveMedia';

const homeIcon = require('./assets/home-icon.png')
const addIcon = require('./assets/add-icon.png');
const settingsIcon = require('./assets/settings-icon.png');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      home: true,
      settings: false,
      customize: false,
    }
  }

  currentPage = <Home />;
  
  clickHandler() {
    if(this.state.home) {
      this.currentPage = <Home />;
    } else if(this.state.settings) {
      // this.currentPage = <Settings />;
    } else {
      // this.currentPage = <Customize />;
    }
  }

  render() {
    return (
      <div>
        <div className="customize-bar">
          <CustomizeButton icon={homeIcon} handleClick={ () => console.log('Home') } />
          <CustomizeButton icon={addIcon} handleClick={ () => console.log('Add social media') } />
          <CustomizeButton icon={settingsIcon} handleClick={ () => console.log('Settings') } />
        </div>
        {this.currentPage}
      </div>
    );
  }
}

class CustomizeButton extends Component {
  constructor(props) {
    super(props);
    this.icon = props.icon;
    this.handleClick = props.handleClick.bind(this);
  }

  render() {
    return (
      <button className="customize-button" onClick={this.handleClick}>
          <img src={this.icon} className="customize-button" alt="add-icon" />
      </button>
    )
  }
}
