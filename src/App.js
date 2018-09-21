import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Notification Hub</h1>
        </header>
        <MediaBox icon={logo} mediaName="Name 1"/>
        <MediaBox icon={logo} mediaName="Name 2"/>
        <MediaBox icon={logo} mediaName="These are all classes"/>
      </div>
    );
  }
}

class MediaBox extends Component {
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
    </div>
    );
  }
}

export default App;
