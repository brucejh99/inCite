/* global chrome */
import { types } from 'mobx-state-tree';

const CitationStoreModel = types
    .model('Citation', {
        article: types.maybeNull(types.string),
        author: types.maybeNull(types.string),
        website: types.maybeNull(types.string),
        publisher: types.maybeNull(types.string),
        datePublished: types.maybeNull(types.Date),
        dateRetrieved: types.maybeNull(types.Date),
        url: types.maybeNull(types.string),
        id: types.string
    })
    .actions(self => ({
        setCitation(citation) {
            self.article = citation.article;
            self.author = citation.author;
            self.website = citation.website;
            self.publisher = citation.publisher;
            self.datePublished = citation.datePublished || null;
            self.dateRetrieved = citation.dateRetrieved || null;
            self.url = citation.url;
            self.id = citation.id;
        },
        updateArticle(article) {
            self.article = article;
        },
        updateAuthor(name) {
            self.author = name;
        },
        updateWebsite(site) {
            self.website = site;
        },
        updatePublisher(publisher) {
            self.publisher = publisher;
        },
        updateDatePublished(date) {
            self.datePublished = date;
        },
        updateDateRetrieved(date) {
            self.dateRetrieved = date;
        },
        updateURL(url) {
            self.url = url;
        },
        clearCitation() {
            self = {
                ...self,
                ...emptyCitation
            }
        }
    }))
    .views(self => ({
        get citation() {
            return {
                article: self.article,
                author: self.author,
                website: self.website,
                publisher: self.publisher,
                datePublished: self.datePublished,
                dateRetrieved: self.dateRetrieved,
                url: self.url,
                id: self.id
            }
        }
    }));

export const emptyCitation = {
    article: null,
    author: null,
    website: null,
    publisher: null,
    datePublished: null,
    dateRetrieved: null,
    url: null,
    id: '-1',
}

export default CitationStoreModel;
