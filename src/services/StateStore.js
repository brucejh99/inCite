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

const AppStateModel = types
    .model('App', {
        bibliographyListPage: types.boolean,
        bibliographyPage: types.boolean,
        citationPage: types.boolean,
        editingValue: types.maybeNull(Citation)
    })
    .actions(self => ({
        pesistentState() {
            const persistentState = JSON.parse(localStorage.getItem('PersistentState'));
            if(persistentState) {
                self = {
                    ...self,
                    ...persistentState,
                    editingValue: null
                }
            } else {
                self = {
                    ...self,
                    ...defaultState,
                    editingValue: null
                }
            }
        },
        togglePage(pageName) {
            switch(pageName) {
                case("BibliographyList"):
                    self.bibliographyListPage = true;
                    self.bibliographyPage = false;
                    self.citationPage = false;
                    break;
                case("Citation"):
                    self.bibliographyListPage = false;
                    self.bibliographyPage = false;
                    self.citationPage = true;
                    break;
                case("Bibiography"):
                    self.bibliographyListPage = false;
                    self.bibliographyPage = true;
                    self.citationPage = false;
                    break;
                default:
                    self.bibliographyListPage = true;
                    self.bibliographyPage = false;
                    self.citationPage = false;
                    break;
            }
            const newState = {
                bibliographyListPage: true,
                bibliographyPage: false,
                citationPage: false
            }
            localStorage.setItem('PersistentState', JSON.stringify(newState));
        },
        startEditCitation(citation) {
            self.bibliographyListPage = false;
            self.bibliographyPage = false;
            self.citationPage = true;
            self.editingValue = citation;
        },
        endEditCitation() {
            self.bibliographyListPage = false;
            self.bibliographyPage = true;
            self.citationPage = false;
        }
    }))
    .views(self => ({
        get appState() {
            const { bibliographyListPage, bibliographyPage, citationPage, editingValue } = self;
            return { bibliographyListPage, bibliographyPage, citationPage, editingValue };
        }
    }));

export const defaultState = {
    bibliographyListPage: true,
    bibliographyPage: false,
    citationPage: false
}

export default AppStateModel;
