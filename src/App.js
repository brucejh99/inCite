import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import AuthenticationForm from './components/AddRemoveMedia';

const homeIcon = require('./assets/home-icon.png')
const addIcon = require('./assets/add-icon.png');

export default class App extends Component {
  constructor() {
    super();
    this.homePage = this.homePage.bind(this);
    this.customizePage = this.customizePage.bind(this);
    this.state = {
      home: true,
      customize: false,
    }
  }

  homePage() {
    this.setState({
      home: true,
      customize: false,
    });
  }

  customizePage() {
    this.setState({
      home: false,
      customize: true,
    });
  }

  render() {
    return (
      <div>
        <div className="customize-bar">
          <button className="customize-button" onClick={this.homePage}>
              <img src={homeIcon} className="customize-button" alt="add-icon" />
          </button>
          <button className="customize-button" onClick={this.customizePage}>
              <img src={addIcon} className="customize-button" alt="add-icon" />
          </button>
        </div>
        {this.state.home ? <Home /> : <AuthenticationForm />}
      </div>
    );
  }
}
