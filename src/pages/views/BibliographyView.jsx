import React, { Component } from 'react';
import './BibliographyView.css';
import { Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import ScrollableList from '../../components/ScrollableList';

class BibliographyView extends Component {
  // TODO: move to components
  styleButton = (styleName) => {
    const { style, updateStyle } = this.props;
    return (
      <button
        className={style === styleName ? 'style-button selected' : 'style-button default'}
        onClick={() => updateStyle(styleName)}>
        {styleName}
      </button>
    );
  }

  render() {
    const { bibliography, deleteItem, edit } = this.props;

    return (
      <div className="body">
        <div className="button-container">
            {this.styleButton('MLA')}
            {this.styleButton('APA')}
            {this.styleButton('Chicago')}
            {this.styleButton('Harvard')}
        </div>
        <div className="display">
          <ScrollableList
            data={bibliography}
            onClick={edit}
            delete={deleteItem}
          />
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

export default inject('store')(observer(BibliographyView));