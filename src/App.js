import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomizeBar from './components/CustomizeBar';
import { AuthenticationForm, AddRemoveMedia } from './components/AddRemoveMedia';
import { NotifMediaBox, NotifMsgMediaBox } from './components/MediaBox';
import GoogleAuth from './components/Gmail';
import { FacebookAuth, FacebookNotification } from './components/Facebook';

const fbLogo = require('./assets/fb-logo.svg');
const gmailLogo = require('./assets/gmail-logo.svg');

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Notification Hub</h1>
        </header>
        <CustomizeBar />
        <NotifMsgMediaBox icon={fbLogo} mediaName="Facebook"/>
        <NotifMediaBox icon={gmailLogo} mediaName="Gmail"/>
        <NotifMediaBox icon={logo} mediaName="These are all classes"/>
        <AuthenticationForm mediaName="Facebook" />
      </div>
    );
  }
}
