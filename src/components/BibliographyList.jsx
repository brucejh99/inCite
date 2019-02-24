import React, { Component } from 'react';
import './BibliographyList.css';
import {
  List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default class BibliographyList extends Component {
  render() {
    const bibliographyList = (
      <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
        {this.props.list.map(item => (
          <ListItem divider onClick={() => this.props.selectBibliography(item.name)} className="list-item">
            <div dangerouslySetInnerHTML={{ __html: item }} className="list-text"/>
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => this.props.delete(item.name)}
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