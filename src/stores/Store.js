import NavigationStoreModel, { defaultView } from './NavigationStore';
import BibliographyStoreModel, { emptyBibliography }  from './BibliographyStore';

class StoreModel {
    navigation = NavigationStoreModel.create(defaultView);
    bibliography = BibliographyStoreModel.create(emptyBibliography);

    init = () => {
        const storedPage = localStorage.getItem('PersistentState');
        const storedBib = localStorage.getItem('Bibliographies');

        if(storedPage) this.navigation = NavigationStoreModel.create(JSON.parse(storedPage));
        if(storedBib) {
            const bibliographies = JSON.parse(storedBib);
            const activeBib = JSON.parse(localStorage.getItem(bibliographies.name));
            this.bibliography = BibliographyStoreModel.create({
                name: activeBib,
                list: bibliographies.list,
                style: activeBib.style,
                citations: activeBib.citations
            });
        }
    }
}

const Store = new StoreModel();
Store.init();
export default Store;