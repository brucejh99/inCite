/* global chrome */

import React, { Component } from 'react';
import './Citation.css';
import request from 'request';
import LoadingPage from './Loading';
import { getOrSetBibliography, updateBibliography } from '../services/Storage';

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
    this.addToBibliography = this.addToBibliography.bind(this);
    this.state = {
      complete: false,
      success: false,
      article: null,
      author: null,
      publisher: null,
      datePublished: null,
      dateRetrieved: this.getCorrectedCurrentDate(),
      url: null,
      added: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      const url = tabs[0].url;
      request({ uri: url, timeout: 5000 }, async function(err, res, html) {
        if(html === undefined || err) {
          console.log('Could not read the page! We should display this somewhere.');
          self.setState({
            url: url,
            complete: true
          });
        } else {
          const metadata = await metascraper({ html, url });
          metadata.success = true;
          let dateString = metadata.date;
          if(dateString) dateString = new Date(dateString);
          self.setState({
            complete: true,
            success: true,
            article: metadata.title,
            author: metadata.author,
            publisher: metadata.publisher,
            datePublished: dateString,
            url: url
          });
        }
      });
    });
  }

  getCorrectedCurrentDate() { // correct the date for timezone differences
    let date = new Date();
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return date;
  }

  onChange(field, value) {
    this.setState({
      [field]: value
    },
    function () { // testing
      console.log(field + ": " + this.state[field]);
    });
  }

  toHTMLDate(date) {
    let dateString;
    try {
      dateString = date.toISOString().split("T")[0];
    } catch {
      dateString = '';
    }
    return dateString;
  }

  addToBibliography(e) {
    e.preventDefault();
    let bibliography = getOrSetBibliography();
    const metadata = {
      article: this.state.article || undefined,
      author: this.state.author || undefined,
      publisher: this.state.publisher,
      datePublished: this.state.datePublished,
      dateRetrieved: this.state.dateRetrieved,
      url: this.state.url
    }

    bibliography.push(metadata);
    updateBibliography(bibliography);
    this.setState({ added: 'Added to bibliography!' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Format: {this.state.style}</h1>
        </header>

        <div className="body">
        { this.state.complete ?
          <form onSubmit={this.addToBibliography}>
            <div className="table">
              <FormField fieldName="Publisher" inputType="text" name="publisher"
                value = {this.state.publisher} onChange={this.onChange} />
              <FormField fieldName="Article" inputType="text" name="article"
                value={this.state.article} onChange={this.onChange} />
              <FormField fieldName="Author" inputType="text" name="author"
                value={this.state.author} onChange={this.onChange} />
              <FormField fieldName="Date Published" inputType="date" name="datePublished"
                value={this.toHTMLDate(this.state.datePublished)} onChange={this.onChange} />
              <FormField fieldName="Date Retrieved" inputType="date" name="dateRetrieved"
                value={this.toHTMLDate(this.state.dateRetrieved)} onChange={this.onChange} />
              <FormField fieldName="URL" inputType="text" name="url"
                value={this.state.url} onChange={this.onChange} />
            </div>
            <div className="add-citation"><input type="submit" value="Add Citation" /><br />
            {this.state.added} </div>
          </form>
          :
        <LoadingPage /> }
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
    let fieldValue = event.target.value;

    if (fieldName == "datePublished" || fieldName == "dateRetrieved") {
      fieldValue = new Date(fieldValue);
    }

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
