/* global chrome */
import React, { Component } from 'react';
import Navigator from './components/Navigator';
import request from 'request';

export default class App extends Component {

  componentDidMount() {
    const self = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      const url = tabs[0].url;
      self.setState({page: url});
      console.log(`Url: ${tabs[0].url}`);
      request(url, { timeout: 5000 }, (err, res, body) => {
        if(!err) console.log(body);
        else console.log(err);
      });
    });
  }
  
  render() {
    return (
      <div>
        { this.state && this.state.page && <Navigator url={this.state.page} /> }
      </div>
    )
  }
}
