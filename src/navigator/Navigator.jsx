import React, { Component, Suspense } from 'react';
import { observer, inject } from 'mobx-react';
import './Navigator.css';

const BibliographyScreen = React.lazy(() => import('../pages/screens/BibliographyScreen'));
const CitationScreen = React.lazy(() => import('../pages/screens/CitationScreen'));
const BibliographyListScreen = React.lazy(() => import('../pages/screens/BibliographyListScreen'));

const addIcon = require('../assets/add-icon.png');

/**
 * Class that provides a taskbar and wrapper to render different pages
 */
class Navigator extends Component {
  render() {
    const { navigation, bibliography } = this.props.store;
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
            {/* TODO: performance test this prerender strategy: */}
            <Suspense fallback={null}>
              <div hidden={true}>
                <BibliographyListScreen />
                <BibliographyScreen />
                <CitationScreen />
              </div>
          </Suspense>
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