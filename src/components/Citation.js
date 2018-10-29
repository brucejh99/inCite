import React, { Component } from 'react';
import logo from '../logo.svg';
import './Citation.css';

export default class Citation extends Component {
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
