/* global chrome */
import React, { Component } from 'react';
import LoadingPage from './components/Loading';
import Navigator from './components/Navigator';
import request from 'request';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

export default class App extends Component {
  constructor() {
    super();
    this.state = { metadata: null }
  }

  componentDidMount() {
    const self = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      // move this into citations so we only have to load and render the loading screen when necessary (or better yet, pull in background while on other pages?)
      const url = tabs[0].url;
      request(tabs[0], async function(err, res, html) {
        if(!err) {
          const metadata = await metascraper({ html, url });
          console.log(metadata);
          self.setState({ metadata });
        } else {
          console.log(err);
        }
      });
    });
  }
  
  render() {
    return (
      <div>
        { this.state.metadata ? <Navigator metadata={ this.state.metadata } /> : <LoadingPage /> }
      </div>
    )
  }
}
