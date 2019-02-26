/* global chrome */
import { types } from 'mobx-state-tree';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';

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
            self.article = emptyCitation.article;
            self.author = emptyCitation.author;
            self.website = emptyCitation.website;
            self.publisher = emptyCitation.publisher;
            self.datePublished = emptyCitation.datePublished;
            self.dateRetrieved = emptyCitation.dateRetrieved;
            self.url = emptyCitation.url;
            self.id = emptyCitation.id;
        }
    }))
    .views(self => ({
        get citation() {
            const citation = {
                article: self.article,
                author: self.author,
                website: self.website,
                publisher: self.publisher,
                datePublished: self.datePublished,
                dateRetrieved: self.dateRetrieved,
                url: self.url,
                id: self.id
            }
            citation.apa = toAPA(citation);
            citation.mla = toMLA(citation);
            citation.chicago = toChicago(citation);
            citation.harvard = toHarvard(citation);
            return citation;
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
