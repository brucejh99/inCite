/* global chrome */

import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './Citation.css';
import request from 'request';
import LoadingPage from './Loading';
import { getOrSetBibliography, updateBibliography } from '../services/Storage';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

/**
 * Citation screen. New Invariant: all citations must have an ID so we can determine replace vs. add based on whether or not it exists
 */
export default class Citation extends Component {
  constructor(props) {
    super(props);
    this.addToBibliography = this.addToBibliography.bind(this);
    this.state = {
      complete: false,
      success: false,
      article: this.props.citation === null ? null : this.props.citation.article,
      author: this.props.citation === null ? null : this.props.citation.author,
      website: this.props.citation === null ? null : this.props.citation.website,
      publisher: this.props.citation === null ? null : this.props.citation.publisher,
      datePublished: this.props.citation === null ? null : this.props.citation.datePublished,
      dateRetrieved: this.props.citation === null ? this.getCorrectedCurrentDate() : this.props.citation.dateRetrieved,
      url: this.props.citation === null ? null : this.props.citation.url,
      id: this.props.citation ? this.props.citation.id : null,
      added: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if(this.props.citation !== null) {
      this.setState({
        complete: true,
        success: true
      });
    } else {
      const self = this;
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        const url = tabs[0].url;
        request({ uri: url, timeout: 5000 }, async function(err, res, html) {
          if(html === undefined || err) {
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
              website: metadata.publisher,
              publisher: undefined,
              datePublished: dateString,
              url: url
            });
          }
        });
      });
    }
  }

  getCorrectedCurrentDate() { // correct the date for timezone differences
    let date = new Date();
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return date;
  }

  onChange(field, value) {
    this.setState({ [field]: value });
  }

  toHTMLDate(date) {
    let dateString;
    try {
      dateString = new Date(date).toISOString().split("T")[0];
    } catch {
      dateString = '';
    }
    return dateString;
  }

  addToBibliography(e) {
    e.preventDefault();
    let bibliography = getOrSetBibliography();
    let metadata = {
      article: this.state.article || undefined,
      author: this.state.author || undefined,
      publisher: this.state.publisher,
      website: this.state.website,
      datePublished: this.state.datePublished,
      dateRetrieved: this.state.dateRetrieved,
      url: this.state.url,
      id: this.state.id || uuid()
    }

    metadata.mla = toMLA(metadata);
    metadata.apa = toAPA(metadata);
    metadata.chicago = toChicago(metadata);
    metadata.harvard = toHarvard(metadata);

    const newBibliography = bibliography.filter(citation => citation.id !== metadata.id);
    newBibliography.push(metadata);
    updateBibliography(newBibliography);
    this.setState({ added: 'Added to bibliography!' });
    this.props.toggleEdit(null);
  }

  render() {
    return (
      <div>
      { this.state.complete ?
        <form onSubmit={this.addToBibliography}>
          <div className="table">
            <FormField fieldName="Website" inputType="text" name="website"
              value={this.state.website} onChange={this.onChange} />
            <FormField fieldName="Article" inputType="text" name="article"
              value={this.state.article} onChange={this.onChange} />
            <FormField fieldName="Author" inputType="text" name="author"
              value={this.state.author} onChange={this.onChange} />
              <FormField fieldName="Publisher" inputType="text" name="publisher"
              value={this.state.publisher} onChange={this.onChange} />
            <FormField fieldName="Date Published" inputType="date" name="datePublished"
              value={this.toHTMLDate(this.state.datePublished)} onChange={this.onChange} />
            <FormField fieldName="Date Retrieved" inputType="date" name="dateRetrieved"
              value={this.toHTMLDate(this.state.dateRetrieved)} onChange={this.onChange} />
            <FormField fieldName="URL" inputType="text" name="url"
              value={this.state.url} onChange={this.onChange} />
          </div>
          <div className="add-citation">
            <input type="submit" value={this.state.id ? 'Replace Citation' : 'Add Citation'} /><br />
            {this.state.added}
          </div>
        </form>
        :
      <LoadingPage /> }
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
