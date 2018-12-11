import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './Loading.css';

export default class LoadingPage extends Component {
  render() {
    return (
      <div className="body">
        <header>
          <img src={logo} className="load-image" />
          <h1>Pulling data...</h1>
        </header>
      </div>
    );
  }
}
