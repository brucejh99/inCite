import React, { Component } from 'react';
import { AddRemoveMedia } from './AddRemoveMedia';
import './Components.css';

const addIcon = require('../assets/add-icon.png');
const settingsIcon = require('../assets/settings-icon.png');

export default class CustomizeBar extends Component {
    constructor() {
      super();
      this.active = false;
    }
    render() {
      return (
        <div className="customize-bar">
          <CustomizeButton icon={addIcon} />
          <CustomizeButton icon={settingsIcon} />
        </div>
      )
    }
  }
  
  class CustomizeButton extends Component {
    constructor(props) {
      super(props);
      this.icon = props.icon;
      this.handleClick = this.handleClick.bind(this);
      this.state = {
          active: false,
      }
    }

    handleClick() {
        console.log('Clicked');
    }

    render() {
      return (
        <div className="customize-button" onClick={this.handleClick}>
            <img src={this.icon} className="customize-button" alt="add-icon" />
        </div>
      )
    }
  }
