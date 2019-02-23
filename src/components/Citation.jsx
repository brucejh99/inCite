/* global chrome */
import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './Citation.css';
import request from 'request';
import LoadingPage from './Loading';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';
import { inject, observer } from 'mobx-react';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

/**
 * Citation screen. All citations must have an ID so we can determine replace vs. add based on whether or not it exists
 */
class Citation extends Component {
  constructor(props) {
    super(props);
    this.addToBibliography = this.addToBibliography.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      complete: false
    }
  }

  componentDidMount() {
    const { editingValue } = this.props;
    if(editingValue !== null) {
      this.setState({
        article: editingValue.article,
        author: editingValue.author,
        website: editingValue.website,
        publisher: editingValue.publisher,
        datePublished: editingValue.datePublished,
        dateRetrieved: editingValue === null ?
          this.getCorrectedCurrentDate() :
          editingValue.dateRetrieved,
        url: editingValue.url,
        id: editingValue.id,
        added: '',
        complete: true
      });
    } else {
      const self = this;
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        const url = tabs[0].url;
        request({ uri: url, timeout: 5000 }, async function(err, res, html) {
          if(html === undefined || err) {
            self.setState({
              url: url,
              id: uuid(),
              complete: true
            });
          } else {
            const metadata = await metascraper({ html, url });
            let dateString = metadata.date;
            if(dateString) dateString = new Date(dateString);
            self.setState({
              complete: true,
              article: metadata.title,
              author: metadata.author,
              website: metadata.publisher,
              publisher: undefined,
              datePublished: dateString,
              dateRetrieved: this.getCorrectedCurrentDate(),
              url: url,
              id: uuid()
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
    if(date === null) return null;
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
    const { appState, bibliography } = this.props.store;
    let metadata = {
      article: this.state.article || undefined,
      author: this.state.author || undefined,
      publisher: this.state.publisher,
      website: this.state.website,
      datePublished: this.state.datePublished,
      dateRetrieved: this.state.dateRetrieved,
      url: this.state.url,
      id: this.state.id
    }

    metadata.mla = toMLA(metadata);
    metadata.apa = toAPA(metadata);
    metadata.chicago = toChicago(metadata);
    metadata.harvard = toHarvard(metadata);

    bibliography.addCitation(metadata);
    this.setState({ added: 'Added to bibliography!' });
    appState.endEditCitation();
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

    if (fieldName === "datePublished" || fieldName === "dateRetrieved") {
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

export default inject('store')(observer(Citation));