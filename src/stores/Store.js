import NavigationStoreModel, { defaultView } from './NavigationStore';
import BibliographyStoreModel, { emptyBibliography }  from './BibliographyStore';

class StoreModel {
    navigation = NavigationStoreModel.create(defaultView);
    bibliography = BibliographyStoreModel.create(emptyBibliography);

    init = () => {
        const storedPage = localStorage.getItem('PersistentState');
        const storedBib = localStorage.getItem(this.bibliography.activeBibName);

        if(storedPage) this.appState = NavigationStoreModel.create(JSON.parse(storedPage));
        if(storedBib) this.bibliography = BibliographyStoreModel.create(JSON.parse(storedBib));
    }
}

const store = new StoreModel();
store.init();
export default store;