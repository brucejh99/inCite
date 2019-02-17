import React, { Component, Suspense } from 'react';
import './Navigator.css';
import { getOrSetState, updateState } from '../services/Storage';
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
    this.bibliographyListPage = this.bibliographyListPage.bind(this);
    this.bibliographyPage = this.bibliographyPage.bind(this);
    this.citationPage = this.citationPage.bind(this);
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
    this.setState({ style: newStyle }, () => { updateState(this.state) });
  }

  /**
   * Renders bibliography list page and updates state to bibliographyListPage in state and local storage
   */
  bibliographyListPage() {
    this.setState({
      bibliographyListPage: true,
      bibliographyPage: false,
      citationPage: false,
      editingValue: null
    }, () => updateState ({
      bibliographyPage: this.state.bibliographyPage,
      citationPage: this.state.citationPage,
      bibliographyListPage: this.state.bibliographyListPage,
      style: this.state.style
    }));
  }

  /**
   * Renders bibliography page and updates state to bibliographyPage in state and local storage
   */
  bibliographyPage() {
    this.setState({
      bibliographyListPage: false,
      bibliographyPage: true,
      citationPage: false,
      editingValue: null
    }, () => updateState({
      bibliographyPage: this.state.bibliographyPage,
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
      bibliographyListPage: false,
      bibliographyPage: false,
      citationPage: true,
      editingValue: null
    }, () => updateState({
      bibliographyPage: this.state.bibliographyPage,
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
      bibliographyPage: citation === null ? true : false,
      citationPage: citation === null ? false : true,
      bibliographyListPage: false,
      editingValue: citation
    }, () => updateState({
      bibliographyPage: this.state.bibliographyPage,
      citationPage: this.state.citationPage,
      bibliographyListPage: this.state.bibliographyListPage,
      style: this.state.style
    }));
  }

  render() {
    let currentPage;
    if (this.state.bibliographyListPage) {
      currentPage = <BibliographyList />;
    } else if (this.state.bibliographyPage) {
      currentPage = <Home updateStyle={this.updateStyle} toggleEdit={this.editPage} />;
    } else if (this.state.citationPage) {
      currentPage = <Citation citation={this.state.editingValue} toggleEdit={this.editPage} />;
    }

    return (
      <div>
        <div className="customize-bar">
          <PageButton icon={addIcon} onClickMethod={this.bibliographyListPage} />
          <PageButton icon={addIcon} onClickMethod={this.bibliographyPage} />
          <PageButton icon={addIcon} onClickMethod={this.citationPage} />
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
