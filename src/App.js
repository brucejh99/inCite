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

const makeUndefined = (url) => {
  const undefinedData = {
    success: false,
    title: null,
    author: null,
    publisher: null,
    date: null,
    url
  }
  return undefinedData;
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      metadata: null,
      success: undefined
    }
  }

  componentDidMount() {
    const self = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      // TODO: move this into citations so we only have to load and render the loading screen when necessary (or better yet, pull in background while on other pages?)
      const url = tabs[0].url;
      request({ uri: url, timeout: 10000 }, async function(err, res, html) {
        if(html === undefined || err) {
          console.log('Took too long to read!');
          self.setState({ 
            metadata: makeUndefined(url),
          });
        } else {
          const metadata = await metascraper({ html, url });
          metadata.success = true;
          console.log(metadata);
          self.setState({ metadata });
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
