import StateStoreModel, { defaultState } from './StateStore';
import BibliographyStoreModel, { emptyBibliography }  from './BibliographyStore';

class StoreModel {
    appState = StateStoreModel.create(defaultState);
    bibliography = BibliographyStoreModel.create(emptyBibliography);

    init = () => {
        const storedState = localStorage.getItem('PersistentState');
        const storedBib = localStorage.getItem('Bibliographies');

        if(storedState !== null) {
            this.appState = StateStoreModel.create(JSON.parse(storedState));
        }
        if(storedBib !== null) {
            this.bibliography = BibliographyStoreModel
                .create(JSON.parse(localStorage.getItem(JSON.parse(storedBib.current))));
        }
    }
}

export default new StoreModel().init();