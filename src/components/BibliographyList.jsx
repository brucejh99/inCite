import React, { Component } from 'react';
import {
  Button, List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import './BibliographyList.css';
import { getState, createBibliography } from '../services/Storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.createBibliography = this.createBibliography.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = getState();
    this.state.bibliographyList = [];
    this.state.name = "Untitled";
  }

  createBibliography() {
    createBibliography(this.state.name);
  }

  selectBibliography(bibliographyName) {
    // Update the current bibliography and open "home"
  }

  onChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    this.setState({ [fieldName]: fieldValue });
  }

  render() {
    return (
      <div className="body">
        <div className="display">

        <form onSubmit={this.createBibliography}>
          Name: <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
          <br/>
          <input type="submit" value="Create New Bibliography" />
        </form>

          <div className="list-container">
            <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
              {this.state.bibliographyList.map(item => (
                <ListItem divider className="list-item">
                  <div dangerouslySetInnerHTML={{ __html: 'test' }} className="list-text" />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        // set current bib
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
            </List>
          </div>
        </div>
      </div>
    );
  }
}
