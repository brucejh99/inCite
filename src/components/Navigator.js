import React, { Component, Suspense } from 'react';
import './Navigator.css';
import { getOrSetState, updateState } from '../services/Storage';
const Home = React.lazy(() => import('./Home'));
const Citation = React.lazy(() =>import('./Citation'));

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
   * Renders launch page and updates state to launchPage in state and local storage
   */
  launchPage() {
    this.setState({
      launchPage: true,
      citationPage: false,
      editingValue: null
    }, () => updateState({
      launchPage: this.state.launchPage,
      citationPage: this.state.citationPage,
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
      editValue: null
    }, () => updateState({
      launchPage: this.state.launchPage,
      citationPage: this.state.citationPage,
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
      editingValue: citation
    }, () => updateState({
      launchPage: this.state.launchPage,
      citationPage: this.state.citationPage,
      style: this.state.style
    }));
  }

  render() {
    return (
      <div>
        {this.state.style !== null ?
        <div className="customize-bar">
          <PageButton icon={addIcon} onClickMethod={this.launchPage} />
          <PageButton icon={addIcon} onClickMethod={this.citationPage} />
        </div> : null
        }
        <h1 className="splash">inCite</h1>
        <Suspense fallback={null}>
            {(this.state.style === null) || this.state.launchPage ?
            <Home updateStyle={this.updateStyle} toggleEdit={this.editPage} /> :
            <Citation citation={this.state.editingValue} toggleEdit={this.editPage} />}
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
