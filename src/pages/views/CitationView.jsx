import React, { Component } from 'react';
import FormField from '../../components/FormField';
import Button from '../../components/Button';

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
        <div style={styles.table}>
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
        <div style={styles.buttonContainer}>
          <Button
            onClick={updateBibliography}
            style={styles.button}>
            Update
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  table: {
    display: 'table',
    margin: '0 25px',
    marginTop: '25px',
    borderCollapse: 'collapse'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0px'
  },
  button: {
    height: '34px',
    width: '75px',
    backgroundColor: 'white',
    color: '#F69970',
    fontSize: '14px',
    margin: '0px 3px',
    fontFamily: 'Nunito Sans',
    fontWeight: '900',
    border: '1px solid #F69970'
  }
}