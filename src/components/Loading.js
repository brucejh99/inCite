import React, { Component } from 'react';
import loadCircle from '../assets/loading-circle.png';
import './Loading.css';

export default class LoadingPage extends Component {
  render() {
    return (
      <div className="body">
        <img src={loadCircle} className="load-image" />
      </div>
    );
  }
}
