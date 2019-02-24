/* global chrome */
import React, { Component } from 'react';
import './CitationScreen.css';
import { inject, observer } from 'mobx-react';

/**
 * Citation screen. All citations must have an ID so we can determine replace vs. add based on whether or not it exists
 */
class Citation extends Component {
  onChange = (field, value) => {
    this.setState({ [field]: value });
  }

  toHTMLDate = (date) => {
    if(date === null) return null;
    let dateString;
    try {
      dateString = new Date(date).toISOString().split("T")[0];
    } catch {
      dateString = '';
    }
    return dateString;
  }

  addToBibliography = (e) => {
  }

  render() {
    return (
      <div>
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
  }

  onFieldChange = (event) => {
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