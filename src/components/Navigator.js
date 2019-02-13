import React, { Component, Suspense } from 'react';
import './Navigator.css';
import { getOrSetState, setState } from '../services/Storage';
const Home = React.lazy(() => import('./Home'));
const Citation = React.lazy(() => import('./Citation'));
const BibliographyList = React.lazy(() => import('./BibliographyList'))

const addIcon = require('../assets/add-icon.png'); // update to better buttons

/**
 * Class that provides a taskbar and wrapper to render different pages
 */
export default class Navigator extends Component {
  constructor() {
    super();
    const persistentSettings = getOrSetState();
    this.launchPage = this.launchPage.bind(this);
    this.citationPage = this.citationPage.bind(this);
    this.bibliographyListPage = this.bibliographyListPage.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.editPage = this.editPage.bind(this);
    this.state = {
      editingValue: null,
      ...persistentSettings
    }
  }

  /**
   * Updates style type in state and local storage
   * @param {String} newStyle
   */
  updateStyle(newStyle) {
    this.setState({ style: newStyle }, () => { setState(this.state) });
  }

  /**
   * Renders launch page and updates state to launchPage in state and local storage
   */
  launchPage() {
    this.setState({
      launchPage: true,
      citationPage: false,
      bibliographyListPage: false,
      editingValue: null
    }, () => setState({
      launchPage: this.state.launchPage,
      citationPage: this.state.citationPage,
      bibliographyListPage: this.state.bibliographyListPage,
      style: this.state.style
    }));
  }

  /**
   * Renders citation page and updates state to citationPage in state and local storage
   */
  citationPage() {
    this.setState({
      launchPage: false,
      citationPage: true,
      bibliographyListPage: false,
      editingValue: null
    }, () => setState({
      launchPage: this.state.launchPage,
      citationPage: this.state.citationPage,
      bibliographyListPage: this.state.bibliographyListPage,
      style: this.state.style
    }));
  }

  /**
   * Toggles between editing and non-editing mode. Really just navigates to citation with a prop
   */
  editPage(citation) {
    this.setState({
      launchPage: citation === null ? true : false,
      citationPage: citation === null ? false : true,
      bibliographyListPage: false,
      editingValue: citation
    }, () => setState({
      launchPage: this.state.launchPage,
      citationPage: this.state.citationPage,
      bibliographyListPage: this.state.bibliographyListPage,
      style: this.state.style
    }));
  }

  /**
   * Renders bibliography list page and updates state to bibliographyListPage in state and local storage
   */
  bibliographyListPage() {
    this.setState({
      launchPage: false,
      citationPage: false,
      bibliographyListPage: true
    }, () => updateState({
      launchPage: this.state.launchPage,
      citationPage: this.state.citationPage,
      bibliographyListPage: this.state.bibliographyListPage,
      style: this.state.style
    }));
  }

  render() {
    let currentPage;
    if ((this.state.style === null) || this.state.launchPage) {
      currentPage = <Home updateStyle={this.updateStyle} toggleEdit={this.editPage} />;
    } else if (this.state.citationPage) {
      currentPage = <Citation citation={this.state.editingValue} toggleEdit={this.editPage} />;
    } else if (this.state.bibliographyListPage) {
      currentPage = <BibliographyList />;
    }

    return (
      <div>
        {this.state.style !== null ?
        <div className="customize-bar">
          <PageButton icon={addIcon} onClickMethod={this.launchPage} />
          <PageButton icon={addIcon} onClickMethod={this.citationPage} />
          <PageButton icon={addIcon} onClickMethod={this.bibliographyListPage} />
        </div> : null
        }
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
