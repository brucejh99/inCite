import React, { Component } from 'react';
import './Navigator.css';
import { getOrSetState, updateState } from '../services/Storage';
import Launch from './Launch';
import Citation from './Citation';
import Bibliography from './Bibliography';

const addIcon = require('../assets/add-icon.png');

/**
 * Class that provides a taskbar to navigate between pages and render pages.
 */
export default class Navigator extends Component {
  constructor(props) {
    super(props);
    this.launchPage = this.launchPage.bind(this);
    this.citationPage = this.citationPage.bind(this);
    this.bibliographyPage = this.bibliographyPage.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.url = props.url;
    this.state = getOrSetState();
  }

  /**
   * Event listener to update bibliography name in state and local storage when 'Enter' is pressed
   * @param {Event} e 
   */
  updateName(e) {
    if(e.key === 'Enter') {
      this.setState({
        bibName: e.target.value,
      }, () => { updateState(this.state) });
      console.log(`Updated name to ${e.target.value}`);
    }
  }

  /**
   * Updates style type in state and local storage
   * @param {String} newStyle 
   */
  updateStyle(newStyle) {
    this.setState({ style: newStyle }, () => { updateState(this.state) });
    console.log(`Style updated to ${newStyle}`);
  }

  /**
   * Renders launch page and updates state to launchPage in state and local storage
   */
  launchPage() {
    this.setState({
      launchPage: true,
      citationPage: false,
      bibliographyPage: false,
    }, () => { updateState(this.state) });
  }

  /**
   * Renders citation page and updates state to citationPage in state and local storage
   */
  citationPage() {
    this.setState({
      launchPage: false,
      citationPage: true,
      bibliographyPage: false,
    }, () => { updateState(this.state) });
  }

  /**
   * Renders bibliography page and updates state to bibliographyPage in state and local storage
   */
  bibliographyPage() {
    this.setState({
      launchPage: false,
      citationPage: false,
      bibliographyPage: true,
    }, () => { updateState(this.state) });
  }

  render() {
    return (
      <div>
        {this.state.bibName !== "" && this.state.style !== null ?
        <div className="customize-bar">
          <PageButton icon={addIcon} onClickMethod={this.launchPage} />
          <PageButton icon={addIcon} onClickMethod={this.citationPage} />
          <PageButton icon={addIcon} onClickMethod={this.bibliographyPage} />
        </div> : <div />
        }
        {(this.state.bibName === "") || (this.state.style === null) || this.state.launchPage ?
          <Launch updateName={this.updateName} updateStyle={this.updateStyle} bibName={this.state.bibName} style={this.state.style} /> :
            (this.state.citationPage ? <Citation /> : <Bibliography />)}
          <p>{`Current name: ${this.state.bibName} (we should put this somewhere else after)`}</p>
          <p>{`Current style: ${this.state.style} (this text is for development purposes)`}</p>
          <p>{`Current URL: ${this.url}`}</p>
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
      <div>
        <button className="customize-button" onClick={this.onClickMethod}>
              <img src={this.icon} className="customize-button" alt="add-icon" />
          </button>
      </div>
    )
  }
}
