/* global chrome */
import React, { Component } from 'react';
import './CitationScreen.css';
import { inject, observer } from 'mobx-react';
import FormField from '../../components/FormField';

/**
 * Citation screen. All citations must have an ID so we can determine replace vs. add based on whether or not it exists
 */
class Citation extends Component {
  toHTMLDate = (date) => {
    if(date === null) return null;
    let dateString;
    try {
      dateString = new Date(date).toISOString().split("T")[0];
    } catch {
      dateString = '';
    }
    return dateString;
  }

  updateBibliography = (e) => {
    e.preventDefault();
    const { navigation, bibliography, citation } = this.props.store;
    bibliography.replaceCitation(citation.citation);
    citation.clearCitation();
    navigation.navigate('Bibliography');
  }

  render() {
    const { citation } = this.props.store;
    return (
      <div>
        <form onSubmit={this.updateBibliography}>
          <div className="table">
            <FormField
              fieldName="Website"
              inputType="text"
              name="website"
              value={citation.citation.website}
              onChange={(field, value) => citation.updateWebsite(value)}
            />
            <FormField fieldName="Article"
              inputType="text"
              name="article"
              value={citation.citation.article}
              onChange={(field, value) => citation.updateArticle(value)}
            />
            <FormField
              fieldName="Author"
              inputType="text"
              name="author"
              value={citation.citation.author}
              onChange={(field, value) => citation.updateAuthor(value)}
            />
            <FormField
              fieldName="Publisher"
              inputType="text"
              name="publisher"
              value={citation.citation.publisher}
              onChange={(field, value) => citation.updatePublisher(value)}
            />
            <FormField
              fieldName="Date Published"
              inputType="date"
              name="datePublished"
              value={this.toHTMLDate(citation.citation.datePublished)}
              onChange={(field, value) => citation.updateDatePublished(value)}
            />
            <FormField
              fieldName="Date Retrieved"
              inputType="date"
              name="dateRetrieved"
              value={this.toHTMLDate(citation.citation.dateRetrieved)}
              onChange={(field, value) => citation.updateDateRetrieved(value)}
            />
            <FormField
              fieldName="URL"
              inputType="text"
              name="url"
              value={citation.citation.url}
              onChange={(field, value) => citation.updateURL(value)}
            />
          </div>
          <div className="add-citation">
            <input type="submit" value={'Update'} /><br />
          </div>
        </form>
      </div>
    );
  }
}

export default inject('store')(observer(Citation));