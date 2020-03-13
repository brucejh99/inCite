/* global chrome */
import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { observer, inject } from 'mobx-react';
import BibliographyView from '../views/BibliographyView';
import {
  formatForConverter, toAPA, toMLA, toChicago, toHarvard,
} from '../../services/Converter';
import { getCorrectedCurrentDate } from '../../services/Utils';

/**
 * Bibliography page to set up new bibliography. Default page if no bibliography settings exist.
 * @prop {Function} updateStyle Method to update selected style globally
 */
class BibliographyPage extends Component {
  state = {
    lastUrl: null,
    parsing: false
  }

  metascraper = null;

  addCitation = () => {
    this.setState({ parsing: true });
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const { id, url } = tabs[0];
      let metadata;
      if (!this.metascraper) {
        this.metascraper = require('metascraper')([
          require('metascraper-author')(),
          require('metascraper-date')(),
          require('metascraper-publisher')(),
          require('metascraper-title')(),
          require('metascraper-url')()
        ]);
      }
      chrome.tabs.executeScript(id, {
        code: 'document.documentElement.innerHTML',
        allFrames: true,
      }, async (result) => {
        metadata = await this.metascraper({ html: result[0], url });
        this.storeMetadata(metadata);
      });
    })
  }

  copyCitations = () => {
    const { store } = this.props;
    const { bibliography } = store;
    const copyArea = document.getElementById('copyArea');
    const copyValue = bibliography.renderCitations.map(item => item.citation);
    copyArea.innerHTML = copyValue.join('\n');
    copyArea.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
  }

  editCitation = (citationObject) => {
    const { store } = this.props;
    const { navigation, citation, bibliography } = store;
    const editValue = bibliography.bibCitations.find(value => value.id === citationObject.id);
    citation.setCitation(editValue);
    bibliography.setLatestId(citation.id);
    navigation.navigate('Citation');
  }

  storeMetadata = metadata => {
    const { bibliography } = this.props.store;
    
    let dateString = metadata.date;
    if (dateString) dateString = new Date(dateString);

    const authors = [];
    authors.push(metadata.author ? metadata.author : '');

    const citation = {
      url: metadata.url || null,
      article: metadata.title || null,
      authors,
      website: metadata.publisher || null,
      publisher: null,
      datePublished: dateString || null,
      dateRetrieved: getCorrectedCurrentDate(),
      id: uuid(),
    };
    const formattedCitation = formatForConverter(citation);

    // TODO: add modal to prompt user
    // checkCitationUrlExists returns a boolean
    // console.log(bibliography.checkCitationUrlExists(formattedCitation.url));

    citation.apa = toAPA(formattedCitation);
    citation.mla = toMLA(formattedCitation);
    citation.chicago = toChicago(formattedCitation);
    citation.harvard = toHarvard(formattedCitation);
    bibliography.addCitation(citation);
    this.setState({ parsing: false, lastUrl: citation.url || null });
  }

  render() {
    const { store } = this.props;
    const { parsing } = this.state;
    const { bibliography } = store;
    return (
      <BibliographyView
        bibStyle={bibliography.bibStyle}
        updateStyle={bibliography.updateStyle}
        bibliographyName={bibliography.activeBibName}
        bibliography={bibliography.renderCitations}
        bibliographyList={bibliography.bibList}
        latestId={bibliography.bibLatestId}
        onSelectBibliography={bibliography.selectBibliography}
        addCitation={this.addCitation}
        copy={this.copyCitations}
        editItem={this.editCitation}
        deleteItem={bibliography.deleteCitation}
        addBibliography={bibliography.addBibliography}
        deleteBibliography={bibliography.deleteBibliography}
        parsing={parsing}
      />
    );
  }
}

export default inject('store')(observer(BibliographyPage));
