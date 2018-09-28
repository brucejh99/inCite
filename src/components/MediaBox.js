import React, { Component } from 'react';

const notificationIcon = require('../assets/notification-icon.png');
const messageIcon = require('../assets/message-icon.png');

export class NotifMediaBox extends Component {
    constructor(props) {
      super(props);
      this.logo = props.icon;
      this.mediaName = props.mediaName;
    }
    render() {
      return (
      <div className="media-box">
        <img src={this.logo} className="media-icon" alt="logo1"/>
        <p className="media-name">{this.mediaName}</p>
        <img src={notificationIcon} className="notification-icon" alt="logo1"/>
      </div>
      );
    }
  }
  
export class NotifMsgMediaBox extends Component {
    constructor(props) {
      super(props);
      this.logo = props.icon;
      this.mediaName = props.mediaName;
    }
    render() {
      return (
      <div className="media-box">
        <img src={this.logo} className="media-icon" alt="logo1"/>
        <p className="media-name">{this.mediaName}</p>
        <img src={messageIcon} className="notification-icon" alt="logo1"/>
        <img src={notificationIcon} className="notification-icon" alt="logo1"/>
      </div>
      );
    }
  }
