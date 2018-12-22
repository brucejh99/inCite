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

export default class Citation extends Component {
  constructor() {
    super();
    
    this.state = {
      complete: false,
      success: false,
      article: null,
      author: null,
      publisher: null,
      datePublished: null,
      dateRetrieved: new Date(),
      url: null
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      const url = tabs[0].url;
      request({ uri: url, timeout: 10000 }, async function(err, res, html) {
        if(html === undefined || err) {
          console.log('Could not read the page! We should display this somewhere.');
          self.setState({
            url: url,
            complete: true
          });
        } else {
          const metadata = await metascraper({ html, url });
          metadata.success = true;
          console.log(metadata);
          self.setState({
            complete: true,
            success: true,
            article: metadata.title,
            author: metadata.author,
            website: metadata.publisher,
            datePublished: new Date(metadata.date),
            url: url
          });
        }
      });
    });
  }

  onChange(field, value) {
    this.setState({
      [field]: value
    }, function () {
      console.log(field + ": " + this.state[field]);
    });
  }

  toHTMLDate(date) {
    const dateString = date.toISOString().split("T")[0];
    return dateString;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Format: {this.state.style}</h1>
        </header>

        <div className="body">
        { this.state.complete ?
          <form >
            <div className="table">
              <FormField fieldName="Website" inputType="text" name="website"
                value = {this.state.website} onChange={this.onChange}/>
              <FormField fieldName="Article" inputType="text" name="article"
                value={this.state.article} onChange={this.onChange}/>
              <FormField fieldName="Author" inputType="text" name="author"
                value={this.state.author} onChange={this.onChange}/>
              <FormField fieldName="Date Published" inputType="date" name="datePublished"
                value={this.toHTMLDate(this.state.datePublished)} onChange={this.onChange}/>
              <FormField fieldName="Date Retrieved" inputType="date" name="dateRetrieved"
                value={this.toHTMLDate(this.state.dateRetrieved)} onChange={this.onChange}/>
              <FormField fieldName="URL" inputType="text" name="url"
                value={this.state.url} onChange={this.onChange}/>
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

    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
    const fieldName = event.target.name;
    var fieldValue = event.target.value;

    console.log(fieldValue);
    if (fieldName == "datePublished" || fieldName == "dateRetrieved") {
      fieldValue = new Date(fieldValue);
    }
    console.log(fieldValue);

    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    return (
      <label className="tr">
        <span className="td table-name">{this.props.fieldName}</span>
        <span className="td table-field">
          <input className={this.props.fieldName} type={this.props.inputType}
            name={this.props.name} placeholder={this.props.fieldName}
            value={this.props.value} onChange={this.onFieldChange}/>
        </span>
      </label>
    )
  }
}
