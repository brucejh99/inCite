import { types } from 'mobx-state-tree';
import {
  formatForConverter, toAPA, toMLA, toChicago, toHarvard,
} from '../services/Converter';

const CitationStoreModel = types
  .model('Citation', {
    article: types.maybeNull(types.string),
    authors: types.optional(types.array(types.string), []),
    website: types.maybeNull(types.string),
    publisher: types.maybeNull(types.string),
    datePublished: types.maybeNull(types.Date),
    dateRetrieved: types.maybeNull(types.Date),
    url: types.maybeNull(types.string),
    id: types.string,
  })
  .actions(self => ({
  // note: we should probably find a cleaner way of handling this later
  // i.e. save the citation when extension closes
    saveCitation() {
      localStorage.setItem('CurrentCitation', JSON.stringify({
        article: self.article,
        authors: self.authors,
        website: self.website,
        publisher: self.publisher,
        datePublished: self.datePublished,
        dateRetrieved: self.dateRetrieved,
        url: self.url,
        id: self.id,
      }));
    },
    setCitation(citation) {
      self.article = citation.article;
      // copy by value for display in CitationView
      self.authors = citation.authors.slice();
      self.website = citation.website;
      self.publisher = citation.publisher;
      self.datePublished = citation.datePublished ? new Date(citation.datePublished) : null;
      self.dateRetrieved = citation.dateRetrieved ? new Date(citation.dateRetrieved) : null;
      self.url = citation.url;
      self.id = citation.id;
      this.saveCitation();
    },
    updateArticle(article) {
      self.article = article;
      this.saveCitation();
    },
    addAuthor() {
      self.authors.push('');
    },
    subtractAuthor() {
      self.authors.pop();
    },
    updateAuthor(name, index) {
      self.authors[index] = name;
      this.saveCitation();
    },
    updateWebsite(site) {
      self.website = site;
      this.saveCitation();
    },
    updatePublisher(publisher) {
      self.publisher = publisher;
      this.saveCitation();
    },
    updateDatePublished(date) {
      self.datePublished = date;
      this.saveCitation();
    },
    updateDateRetrieved(date) {
      self.dateRetrieved = date;
      this.saveCitation();
    },
    updateURL(url) {
      self.url = url;
      this.saveCitation();
    },
    clearCitation() {
      self.article = emptyCitation.article;
      self.authors = emptyCitation.authors;
      self.website = emptyCitation.website;
      self.publisher = emptyCitation.publisher;
      self.datePublished = emptyCitation.datePublished;
      self.dateRetrieved = emptyCitation.dateRetrieved;
      self.url = emptyCitation.url;
      self.id = emptyCitation.id;
      localStorage.removeItem('CurrentCitation');
    },
  }))
  .views(self => ({
    get citation() {
      const citation = {
        article: self.article,
        authors: self.authors.slice(),
        website: self.website,
        publisher: self.publisher,
        datePublished: self.datePublished,
        dateRetrieved: self.dateRetrieved,
        url: self.url,
        id: self.id,
      };
      const formattedCitation = formatForConverter(citation);
      citation.apa = toAPA(formattedCitation);
      citation.mla = toMLA(formattedCitation);
      citation.chicago = toChicago(formattedCitation);
      citation.harvard = toHarvard(formattedCitation);
      return citation;
    },
  }));

export const emptyCitation = {
  article: null,
  authors: [''],
  website: null,
  publisher: null,
  datePublished: null,
  dateRetrieved: null,
  url: null,
  id: '-1',
};

export default CitationStoreModel;
