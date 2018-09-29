import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomizeBar from './components/CustomizeBar';

import Home from './components/Home';
// import Settings from './components/Settings';
// import Customize from './components/AddRemoveMedia';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      home: true,
      settings: false,
      customize: false,
    }
  }
  
  clickHandler() {
    if(this.state.home) {
      // this.currentPage = Home;
    } else if(this.state.settings) {
      // this.currentPage = Settings;
    } else {
      // this.currentPage = Customize;
    }
  }

  render() {
    return (
      <div>
        <CustomizeBar />
        <Home />
      </div>
    );
  }
}
