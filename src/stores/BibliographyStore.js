/* global localStorage */
import { types } from 'mobx-state-tree';
import { MLASort, APASort, ChicagoSort, HarvardSort } from '../services/Sorter';

const Citation = types.model({
    article: types.optional(types.string),
    author: types.optional(types.string),
    publisher: types.optional(types.string),
    website: types.optional(types.string),
    datePublished: types.optional(types.Date),
    dateRetrieved: types.optional(types.Date),
    url: types.optional(types.string),
    id: types.string,
    apa: types.string,
    mla: types.string,
    chicago: types.string,
    harvard: types.string
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
            self.name = `__${name}`;
            self.style = style || null;
            self.citations = [];
            self.list.push(name);
            localStorage.setItem(`__${name}`, JSON.stringify({
                style,
                citations: []
            }));
            localStorage.setItem('Bibliographies', JSON.stringify({ name: `__${name}`, list: self.list }));
        },
        deleteBibliography(name) {
            localStorage.removeItem(`__${name}`);
            self.list.replace(self.list.filter(bibName => bibName !== name));
            self.name = '';
            self.citations.replace([]);
            localStorage.setItem('Bibliographies', JSON.stringify({ name: '', list: self.list }));
        },
        selectBibliography(name) {
            localStorage.setItem('Bibliographies', JSON.stringify({ name: `__${name}`, list: self.list }));
            const { style, citations } = JSON.parse(localStorage.getItem(`__${name}`));
            self.name = `__${name}`;
            self.style = style;
            self.citations.replace(citations);
        },
        updateName(name) {
            localStorage.removeItem(self.name);
            self.list.filter(item => item === self.name);
            self.name = `__${name}`;
            self.list.push(self.name);
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }));
            localStorage.setItem('Bibliographies', JSON.stringify({ name: self.name, list: self.list }));
        },
        updateStyle(styleName) {
            self.style = styleName;
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }));
        },
        addCitation(newCitation) {
            self.citations.push(newCitation);
            localStorage.setItem(self.name, JSON.stringify({
                style: self.style,
                citations: self.citations
            }));
        },
        deleteCitation(citation) {
            self.citations.replace(self.citations.filter(item => item.id === citation.id));
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
        },
        get renderCitations() {
            let sortedBibliography = [];
            const jsBib = self.citations.toJS();
            if(jsBib.length === 0) return [];
            switch(self.style) {
                case 'APA':
                    jsBib.sort(APASort);
                    sortedBibliography = jsBib.map(item => item.apa);
                    break;
                case 'MLA': 
                    jsBib.sort(MLASort);
                    sortedBibliography = jsBib.map(item => item.mla);
                    break;
                case 'Chicago':
                    jsBib.sort(ChicagoSort);
                    sortedBibliography = jsBib.map(item => item.chicago);
                    break;
                case 'Harvard':
                    jsBib.sort(HarvardSort);
                    sortedBibliography = jsBib.map(item => item.harvard);
                    break;
                default:
                    sortedBibliography = ['Error: select a valid style'];
            }
            return sortedBibliography;
        }
    }));

export const emptyBibliography = {
    name: 'Untitled',
    style: null,
    citations: [],
    list: []
}

export default BibliographyStoreModel;