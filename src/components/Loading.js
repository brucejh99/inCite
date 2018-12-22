import React, { Component } from 'react';
import loadCircle from '../assets/loading-circle.png';
import './Loading.css';

export default class LoadingPage extends Component {
  render() {
    return (
      <div className="body">
        <header>
          <img src={loadCircle} className="load-image" />
          <h1>Pulling data...</h1>
        </header>
      </div>
    );
  }
}
