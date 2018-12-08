/* global chrome */
import React, { Component } from 'react';
import Navigator from './components/Navigator';
import request from 'request';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

// import request from 'request';
// const extractor = require('unfluff/lib/extractor');
// import extractor from 'article-extractor'; maybe an alternative. Provides less information but potentially more accurate? Let's test.

export default class App extends Component {
  componentDidMount() {
    const theApp = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      const url = tabs[0].url;
      theApp.setState({ page: url });
      console.log(`Url: ${tabs[0].url}`);
      /* extractor.extractData(url, function(err, data) {
        console.log(data);
      }); */
      request(url, async (err, res, html) => {
        if(!err) {
          const metadata = await metascraper({ html, url });
          console.log(metadata);
          theApp.setState({ content: metadata }); // process and break down before passing in to Navigator?
        } else {
          console.log(err);
        }
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
