import React, { Component } from 'react';
import './BibliographyListPage.css';
import BibliographyList from './BibliographyList';
import { getState, createBibliography } from '../services/Storage';

export default class BibliographyListPage extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = getState();
    this.state.name = 'Untitled';
  }

  onChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.setState({ [fieldName]: fieldValue });
  }

  render() {
    return (
      <div>
        <BibliographyList editBibliography={this.props.editBibliography} />
        <form onSubmit={createBibliography(this.state.name)}>
          Name: <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
          <br />
          <input type="submit" value="Create New Bibliography" />
        </form>
      </div>
    );
  }
}
