import React, { Component } from 'react';
import logo from '../logo.svg';
import './Launch.css';

export default class Launch extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">inCite</h1>
        </header>

      </div>
    );
  }
}
