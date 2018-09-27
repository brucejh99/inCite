import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthenticationForm, AddRemoveMedia } from './components/AddRemoveMedia';
import GoogleAuth from './components/Gmail';
import { FacebookAuth, FacebookNotification } from './components/Facebook';

const fbLogo = require('./assets/fb-logo.svg');
const gmailLogo = require('./assets/gmail-logo.svg');
const notificationIcon = require('./assets/notification-icon.png');
const messageIcon = require('./assets/message-icon.png');

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Notification Hub</h1>
        </header>
        <NotifMsgMediaBox icon={fbLogo} mediaName="Facebook"/>
        <NotifMediaBox icon={gmailLogo} mediaName="Gmail"/>
        <NotifMediaBox icon={logo} mediaName="These are all classes"/>
      </div>
    );
  }
}

class NotifMediaBox extends Component {
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

class NotifMsgMediaBox extends Component {
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

export default App;
