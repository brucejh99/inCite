import React, { Component } from 'react';
import './BibliographyView.css';
import {
  Button, List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { inject, observer } from 'mobx-react';

class Bibliography extends Component {
  // TODO: move to components
  styleButton = (styleName) => {
    const { bibliography } = this.props.store;
    return (
      <button
        className={bibliography.bibStyle === styleName ? 'style-button selected' : 'style-button default'}
        onClick={() => bibliography.updateStyle(styleName)}>
        {styleName}
      </button>
    );
  }

  render() {
    const { bibliography, deleteItem } = this.props;
    const citationList = (
      <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
        {bibliography.map(item => (
          <ListItem divider onClick={() => this.props.toggleEdit(item)} className="list-item">
            <div dangerouslySetInnerHTML={{ __html: item }} className="list-text"/>
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={() => deleteItem(item)}>
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
        <div className="button-container">
            {this.styleButton('MLA')}
            {this.styleButton('APA')}
            {this.styleButton('Chicago')}
            {this.styleButton('Harvard')}
        </div>
        <div className="display">
          <div className="list-container">
            {citationList}
          </div>
        </div>
        {
          document.queryCommandSupported('copy')
            && (
            <div>
              <div className="button-container bottom-button">
                <Button variant="outlined" color="primary" onClick={this.props.add}>Add</Button>
                <Button variant="outlined" color="primary" onClick={this.props.copy}>Copy</Button>
              </div>
            </div>
            )
          }
        <div id="copyArea" contentEditable="true" />
      </div>
    );
  }
}

export default inject('store')(observer(Bibliography));