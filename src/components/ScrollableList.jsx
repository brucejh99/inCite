import React, { Component } from 'react';
import './ScrollableList.css';
import {
  List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default class ScrollableList extends Component {
  render() {
    const bibliographyList = (
      <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
        {this.props.data.map(item => (
          <ListItem divider onClick={() => this.props.onClick(item)} className="list-item">
            <div dangerouslySetInnerHTML={{ __html: item.citation }} className="list-text" />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => this.props.delete(item)}
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