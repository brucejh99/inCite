import React, { Component } from 'react';
import { AuthenticationForm, AddRemoveMedia } from './AddRemoveMedia';
import './Components.css';

const homeIcon = require('../assets/home-icon.png')
const addIcon = require('../assets/add-icon.png');
const settingsIcon = require('../assets/settings-icon.png');

export default class CustomizeBar extends Component {
    constructor() {
      super();
      this.renderAuth = this.renderAuth.bind(this);
      this.state = {
        homeActive: true,
        customizeActive: false,
        settingsActive: false,
      }
    }

    renderAuth() {
      this.setState({ homeActive: true });
      return (
        <AuthenticationForm mediaName="Authentication Form" />
      );
    }

    render() {
      return (
        <div className="customize-bar">
          <CustomizeButton icon={homeIcon} handleClick={ () => console.log('Home') } />
          <CustomizeButton icon={addIcon} handleClick={ () => console.log('Add social media') } />
          <CustomizeButton icon={settingsIcon} handleClick={ () => console.log('Settings') } />
        </div>
      )
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
