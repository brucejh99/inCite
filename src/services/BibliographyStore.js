/* global localStorage */
import { types } from 'mobx-state-tree';

const Citation = types.model({
    article: types.optional(types.string),
    author: types.optional(types.string),
    publisher: types.optional(types.string),
    website: types.optional(types.string),
    datePublished: types.optional(types.Date),
    dateRetrieved: types.optional(types.Date),
    url: types.optional(types.string),
    id: types.string
});

const BibliographyStoreModel = types
    .model('Bibliography', {
        name: types.string,
        style: types.maybeNull(types.string),
        citations: types.array(Citation)
    })
    .actions(self => ({
        switchBibliography(name) {
            const { style, citations } = JSON.parse(localStorage.getItem(name));
            self.name = name;
            self.style = style;
            self.citations = citations;
        },
        updateName(name) {
            localStorage.removeItem(self.name);
            self.name = name;
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }));
        },
        updateStyle(styleName) {
            self.style = styleName;
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citation
            }));
        },
        addCitation(citation) {
            self.citations.push(citation);
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citation
            }));
        }
    }))
    .views(self => ({
        get biName() {
            return self.name;
        },
        get bibStyle() {
            return self.style;
        },
        get bibCitations() {
            return self.citation.toJS();
        }
    }));

export const emptyBibliography = {
    name: 'Untitled',
    style: null,
    citations: []
}

export default BibliographyStoreModel;