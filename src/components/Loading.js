import React, { Component } from 'react';
import logo from '../assets/logo.svg';

export default class LoadingPage extends Component {
  render() {
    return (
      <div>
        <header>
          <img src={logo} className="App-logo" />
          <h1 className="App-title">Pulling data...</h1>
        </header>
      </div>
    );
  }
}
