import React, { Component } from 'react';
import './Citation.css';

export default class Citation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: props.style
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Format: {this.state.style}</h1>
        </header>

        <div className="body">
          <form>
            <div className="table">
              <FormField fieldName="Website Name" inputType="text" />
              <FormField fieldName="Article Name" inputType="text" />

              <label className="tr">
                <span className="td table-name">Author</span>
                <span className="td table-field">
                  <input className="author-name-input author-first-name" type="text"
                    name="author-first-name" placeholder="First Name"/>
                  <input className="author-name-input" type="text"
                    name="author-last-name" placeholder="Last Name"/>
                </span>
              </label>
              
              <FormField fieldName="Date Published" inputType="date" />
              <FormField fieldName="Sponsor" inputType="text" />
            </div>
            <div className="add-citation"><input type="submit" value="Add Citation" /></div>
          </form>
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
