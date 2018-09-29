import React, { Component } from 'react';
import logo from '../logo.svg';
import './Home.css';

import { NotifMediaBox, NotifMsgMediaBox } from './MediaBox';

const fbLogo = require('../assets/fb-logo.svg');
const gmailLogo = require('../assets/gmail-logo.svg');

export default class Home extends Component {
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
