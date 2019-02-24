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
        list: types.array(types.string),
        style: types.maybeNull(types.string),
        citations: types.array(Citation)
    })
    .actions(self => ({
        addBibliography(name, style) {
            self.name = name;
            self.style = style || null;
            self.citations = [];
            self.list.push(name);
            localStorage.setItem(name, JSON.stringify({
                style,
                citations: []
            }));
            localStorage.setItem('Bibliographies', JSON.stringify({ name, list: self.list.toJS() }));
        },
        deleteBibliography(name) {
            localStorage.removeItem(name);
            self.list.filter(bib => bib.name !== name);
            localStorage.setItem('Bibliographies', JSON.stringify({ name: '', list: self.list }));
        },
        selectBibliography(name) {
            localStorage.setItem('Bibliographies', { name, list: self.list });
            const { style, citations } = JSON.parse(localStorage.getItem(name));
            self.name = name;
            self.style = style;
            self.citations = citations;
        },
        updateName(name) {
            localStorage.removeItem(self.name);
            self.list.filter(item => item === self.name);
            self.name = name;
            self.list.push(self.name);
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }));
            localStorage.setItem('Bibliographies', JSON.stringify({ name, list: self.list }));
        },
        updateStyle(styleName) {
            self.style = styleName;
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }));
        },
        addCitation(newCitation) {
            self.citations.filter(citation => citation.id !== newCitation.id);
            self.citations.push(newCitation);
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }));
        },
        deleteCitation(citation) {
            self.citations.filter(item => item.id === citation.id);
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }))
        }
    }))
    .views(self => ({
        get activeBibName() {
            const bibs = localStorage.getItem('Bibliographies');
            if(bibs === null) return null;
            return JSON.parse(bibs).name;
        },
        get bibList() {
            return self.list.toJS();
        },
        get bibStyle() {
            return self.style;
        },
        get bibCitations() {
            return self.citations.toJS();
        }
    }));

export const emptyBibliography = {
    name: 'Untitled',
    style: null,
    citations: [],
    list: []
}

export default BibliographyStoreModel;