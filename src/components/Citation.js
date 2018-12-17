/* global chrome */

import React, { Component } from 'react';
import './Citation.css';
import request from 'request';
import LoadingPage from './Loading';

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
    title: '',
    author: '',
    publisher: '',
    date: null,
    url
  }
  return undefinedData;
}

export default class Citation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: null
    }
  }

  componentDidMount() {
    const self = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      // TODO: move this into citations so we only have to load and render the loading screen when necessary (or better yet, pull in background while on other pages?)
      const url = tabs[0].url;
      request({ uri: url, timeout: 10000 }, async function(err, res, html) {
        if(html === undefined || err) {
          console.log('Could not read the page! We should display this somewhere.');
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
      <div className="App">
        <header className="App-header">
          <h1>Format: {this.state.style}</h1>
        </header>

        <div className="body">
        { this.state.metadata ?
          <form>
            <div className="table">

              <FormField fieldName="Website" inputType="text" />
              <FormField fieldName="Article" inputType="text" />
              <AuthorField />
              <FormField fieldName="Date Published" inputType="date" />
              <FormField fieldName="Sponsor" inputType="text" />
            </div>
            <div className="add-citation"><input type="submit" value="Add Citation" /></div>
          </form>
          :
        <LoadingPage />}
        </div>
      </div>
    );
  }
}

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} inputType Type of input (text, date etc.)
 */
class FormField extends Component {
  constructor(props) {
    super(props);
    this.fieldName = props.fieldName;
    this.inputType = props.inputType;
  }

  render() {
    return (
      <label className="tr">
        <span className="td table-name">{this.fieldName}</span>
        <span className="td table-field">
          <input className={this.inputName} type={this.inputType}
            name="name-input" placeholder={this.fieldName}/>
        </span>
      </label>
    )
  }
}

class AuthorField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label className="tr">
        <span className="td table-name">Author</span>
        <span className="td table-field">
          <input className="author-name-input author-first-name" type="text"
            name="author-first-name" placeholder="First"/>
          <input className="author-name-input" type="text"
            name="author-last-name" placeholder="Last"/>
        </span>
      </label>
    )
  }
}
