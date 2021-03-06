import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CitationView from '../views/CitationView';

/**
 * Citation screen. All citations must have an ID so we can determine replace
 * vs. add based on whether or not it exists
 */
class Citation extends Component {
  toHTMLDate = (date) => {
    if (date === null) return null;
    let dateString;
    try {
      [dateString] = new Date(date).toISOString().split('T');
    } catch {
      dateString = '';
    }
    return dateString;
  }

  updateBibliography = (e) => {
    e.preventDefault();
    const { store } = this.props;
    const { bibliography, citation, navigation } = store;
    bibliography.replaceCitation(citation.citation);
    citation.clearCitation();
    navigation.navigate('Bibliography');
  }

  render() {
    const { store } = this.props;
    const { citation, navigation } = store;
    return (
      <CitationView
        website={citation.citation.website}
        article={citation.citation.article}
        authors={citation.citation.authors}
        publisher={citation.citation.publisher}
        datePublished={citation.citation.datePublished}
        dateRetrieved={citation.citation.dateRetrieved}
        url={citation.citation.url}
        updateWebsite={citation.updateWebsite}
        updateArticle={citation.updateArticle}
        addAuthor={citation.addAuthor}
        subtractAuthor={citation.subtractAuthor}
        updateAuthor={citation.updateAuthor}
        updatePublisher={citation.updatePublisher}
        updateDatePublished={citation.updateDatePublished}
        updateDateRetrieved={citation.updateDateRetrieved}
        updateURL={citation.updateURL}
        toHTMLDate={this.toHTMLDate}
        updateBibliography={this.updateBibliography}
        navigateBack={() => navigation.navigate('Bibliography')}
      />
    );
  }
}

export default inject('store')(observer(Citation));
