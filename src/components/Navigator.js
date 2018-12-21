import React, { Component } from 'react';
import './Navigator.css';
import { getOrSetState, updateState } from '../services/Storage';
import Home from './Home';
import Citation from './Citation';

const addIcon = require('../assets/add-icon.png');

/**
 * Class that provides a taskbar to navigate between pages and render pages.
 */
export default class Navigator extends Component {
  constructor() {
    super();
    this.launchPage = this.launchPage.bind(this);
    this.citationPage = this.citationPage.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.state = getOrSetState();
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
      citationPage: false
    }, () => { updateState(this.state) });
  }

  /**
   * Renders citation page and updates state to citationPage in state and local storage
   */
  citationPage() {
    this.setState({
      launchPage: false,
      citationPage: true
    }, () => { updateState(this.state) });
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
        {(this.state.style === null) || this.state.launchPage ?
        <Home updateStyle={this.updateStyle} style={this.state.style} /> : <Citation style={this.state.style}/>}
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
