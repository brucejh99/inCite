import React, { Component, Suspense } from 'react';
import { observer, inject } from 'mobx-react';
import './Navigator.css';

const BibliographyPage = React.lazy(() => import('../pages/screens/BibliographyScreen'));
const Citation = React.lazy(() => import('../pages/screens/CitationScreen'));
const BibliographyListPage = React.lazy(() => import('../pages/screens/BibliographyListScreen'));

const addIcon = require('../assets/add-icon.png'); // update to better buttons

/**
 * Class that provides a taskbar and wrapper to render different pages
 */
class Navigator extends Component {
  render() {
    const { navigation, bibliography } = this.props.store;
    let currentPage;
    if (navigation.page.bibliographyListPage) {
      currentPage = <BibliographyListPage />;
    } else if (navigation.page.bibliographyPage) {
      currentPage = <BibliographyPage />;
    } else if (navigation.page.citationPage) {
      currentPage = <Citation />;
    } else {
      currentPage = <BibliographyListPage />;
    }

    return (
      <div> {/* TODO: there should be no bar. Navigator should be a hidden component. */}
        <div className="customize-bar">
          <PageButton icon={addIcon} onClickMethod={() => navigation.navigate('BibliographyList')} />
          <PageButton icon={addIcon} onClickMethod={() => navigation.navigate('Bibliography')} />
          {bibliography.bibStyle !== null ?
            <PageButton icon={addIcon} onClickMethod={() => navigation.navigate('Citation')} /> :
            null }
        </div>
        <Suspense fallback={null}>
            {currentPage}
        </Suspense>
      </div>
    );
  }
}

/**
 * Button class to that navigate between pages
 * @prop {Image} icon Image displayed on button
 * @prop {Function} onClickMethod Function called when the button is clicked
 */
class PageButton extends Component {
  constructor(props) {
    super(props);
    this.icon = props.icon;
    this.onClickMethod = props.onClickMethod;
  }

  render() {
    return (
      <button className="customize-button" onClick={this.onClickMethod}>
            <img src={this.icon} className="customize-button" alt="add-icon" />
      </button>
    )
  }
}

export default inject('store')(observer(Navigator));