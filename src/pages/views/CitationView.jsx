import React, { Component } from 'react';
import './CitationView.css';
import FormField from '../../components/FormField';

export default class CitationView extends Component {
  render() {
    const {
        website,
        article,
        author,
        publisher,
        datePublished,
        dateRetrieved,
        url,
        updateWebsite,
        updateArticle,
        updateAuthor,
        updatePublisher,
        updateDatePublished,
        updateDateRetrieved,
        updateURL,
        toHTMLDate,
        updateBibliography
    } = this.props;

    return (
      <div>
        <form onSubmit={updateBibliography}>
          <div className="table">
            <FormField
              fieldName="Website"
              inputType="text"
              name="website"
              value={website}
              onChange={(field, value) => updateWebsite(value)}
            />
            <FormField fieldName="Article"
              inputType="text"
              name="article"
              value={article}
              onChange={(field, value) => updateArticle(value)}
            />
            <FormField
              fieldName="Author"
              inputType="text"
              name="author"
              value={author}
              onChange={(field, value) => updateAuthor(value)}
            />
            <FormField
              fieldName="Publisher"
              inputType="text"
              name="publisher"
              value={publisher}
              onChange={(field, value) => updatePublisher(value)}
            />
            <FormField
              fieldName="Date Published"
              inputType="date"
              name="datePublished"
              value={toHTMLDate(datePublished)}
              onChange={(field, value) => updateDatePublished(value)}
            />
            <FormField
              fieldName="Date Retrieved"
              inputType="date"
              name="dateRetrieved"
              value={toHTMLDate(dateRetrieved)}
              onChange={(field, value) => updateDateRetrieved(value)}
            />
            <FormField
              fieldName="URL"
              inputType="text"
              name="url"
              value={url}
              onChange={(field, value) => updateURL(value)}
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