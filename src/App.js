import React, { Component } from 'react';
import './App.css';

import Launch from './components/Launch';
import Citation from './components/Citation';
import Bibliography from './components/Bibliography';

const addIcon = require('./assets/add-icon.png');

export default class App extends Component {
  constructor() {
    super();
    this.launchPage = this.launchPage.bind(this);
    this.citationPage = this.citationPage.bind(this);
    this.bibliographyPage = this.bibliographyPage.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.state = {
      bibName: null,
      style: null,
      launchPage: false,
      citationPage: true,
      bibliographyPage: false,
    }
  }

  updateName(e) {
    if(e.key === 'Enter') {
      this.setState({
        bibName: e.target.value,
      });
      console.log(`Updated name to ${e.target.value}`);
    }
  }

  updateStyle(newStyle) {
    this.setState({
      style: newStyle,
    });
    console.log(`Style updated to ${newStyle}`);
  }

  launchPage() {
    this.setState({
      launchPage: true,
      citationPage: false,
      bibliographyPage: false,
    });
  }

  citationPage() {
    this.setState({
      launchPage: false,
      citationPage: true,
      bibliographyPage: false,
    });
  }

  bibliographyPage() {
    this.setState({
      launchPage: false,
      citationPage: false,
      bibliographyPage: true,
    });
  }

  render() {
    return (
      <div>
        <div className="customize-bar">
          <PageButton icon={addIcon} onClickMethod={this.launchPage} />
          <PageButton icon={addIcon} onClickMethod={this.citationPage} />
          <PageButton icon={addIcon} onClickMethod={this.bibliographyPage} />
        </div>
        {(this.state.bibName === null) || (this.state.style === null) || this.state.launchPage ?
          <Launch updateName={this.updateName} value={this.bibName} updateStyle={this.updateStyle}/> :
            (this.state.citationPage ? <Citation /> : <Bibliography />)}
          <p>{`Current style: ${this.state.style} (this text is for development purposes)`}</p>
      </div>
    );
  }
}

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
