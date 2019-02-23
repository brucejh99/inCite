import React, { Component, Suspense } from 'react';
import { observer, inject } from 'mobx-react';
import './Navigator.css';

const Home = React.lazy(() => import('./Home'));
const Citation = React.lazy(() => import('./Citation'));
const BibliographyList = React.lazy(() => import('./BibliographyList'))

const addIcon = require('../assets/add-icon.png'); // update to better buttons

/**
 * Class that provides a taskbar and wrapper to render different pages
 */
class Navigator extends Component {
  render() {
    const { appState, bibliography } = this.props.store;
    let currentPage;
    if (appState.bibliographyListPage) {
      currentPage = <BibliographyList />;
    } else if (appState.bibliographyPage) {
      currentPage = <Home />;
    } else if (appState.citationPage) {
      currentPage = <Citation />;
    } else {
      currentPage = <BibliographyList />;
    }

    return (
      <div>
        <div className="customize-bar">
          <PageButton icon={addIcon} onClickMethod={appState.navigate('BibliographyList')} />
          <PageButton icon={addIcon} onClickMethod={appState.navigate('Bibliography')} />
          {bibliography.bibStyle !== null ?
            <PageButton icon={addIcon} onClickMethod={appState.navigate('Citation')} /> :
            null }
        </div>

        <h1 className="splash">inCite</h1>
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