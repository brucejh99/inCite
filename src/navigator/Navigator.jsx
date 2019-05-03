import React, { Component, Suspense } from 'react';
import { observer, inject } from 'mobx-react';
import '../assets/styles.css';

const BibliographyScreen = React.lazy(() => import('../pages/screens/BibliographyScreen'));
const CitationScreen = React.lazy(() => import('../pages/screens/CitationScreen'));
const BibliographyListScreen = React.lazy(() => import('../pages/screens/BibliographyListScreen'));

/**
 * Class that wraps the application to render the selected page and load global assets
 */
class Navigator extends Component {
  render() {
    const { navigation } = this.props.store;
    let currentPage;
    if (navigation.page.bibliographyListPage) {
      currentPage = <BibliographyListScreen />;
    } else if (navigation.page.bibliographyPage) {
      currentPage = <BibliographyScreen />;
    } else if (navigation.page.citationPage) {
      currentPage = <CitationScreen />;
    } else {
      currentPage = <BibliographyListScreen />;
    }

    return (
      <Suspense fallback={null}>
          {currentPage}
      </Suspense>
    );
  }
}

export default inject('store')(observer(Navigator));
