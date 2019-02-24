import React, { Component } from 'react';
import './BibliographyPage.css';
import Bibliography from './Bibliography';
import { observer, inject } from 'mobx-react';

/**
 * Bibliography page to set up new bibliography. Default page if no bibliography settings exist.
 * @prop {Function} updateStyle Method to update selected style globally
 */
export default class BibliographyPage extends Component {
  constructor(props) {
    super(props);
    this.updateStyle = props.updateStyle;
    this.styleButton = this.styleButton.bind(this);
  }

  styleButton(styleName) {
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
    const { appState, bibliography } = this.props.store;
    return (
      <div>
        <div className="button-container">
          {this.styleButton('MLA')}
          {this.styleButton('APA')}
          {this.styleButton('Chicago')}
          {this.styleButton('Harvard')}
        </div>
        <Bibliography
          style={appState.bibStyle}
          state={appState.state}
          bibliography={bibliography.bibCitations}
          // toggleEdit={bibliography.startEditCitation}
        />
      </div>
    );
  }
}

export default inject('store')(observer(BibliographyPage));