import React, { Component } from 'react';
import './BibliographyList.css';
import {
  Button, List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { getBibliographyList } from '../services/Storage';

export default class BibliographyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bibliographyList: getBibliographyList()
    };
  }

  deleteBibliography() {
    /*const bibliography = this.state.sortedBibliography;
    bibliography.citations = bibliography.citations.filter(citation => citation.id !== item.id);
    this.setState({ sortedBibliography: bibliography }, () => updateBibliography(bibliography));*/
  }

  render() {
    const bibliographyList = (
      <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
        {this.state.bibliographyList.map(item => (
          <ListItem divider onClick={() => this.props.editBibliography(item)} className="list-item">
            <div dangerouslySetInnerHTML={{ __html: item }} className="list-text"/>
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={this.deleteBibliography()}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
        }
      </List>
    );

    return (
      <div className="body">
        <div className="display">
          <div className="list-container">
            {bibliographyList}
          </div>
        </div>
      </div>
    );
  }
}