import React, { Component } from 'react';
import './Bibliography.css';
import { getOrSetBibliography, resetBibliography } from '../services/Storage';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';

export default class Bibliography extends Component {
  constructor(props) {
    super(props);
    this.generateCitations = this.generateCitations.bind(this);
    this.state = {
      style: props.style,
      bibliography: getOrSetBibliography()
    }
  }

  generateCitations() {
    if(this.state.style === 'APA') {
      this.bibliography.forEach(metadata => toAPA(metadata));
    } else if(this.state.style === 'MLA') {
      this.bibliography.forEach(metadata => toMLA(metadata));
    } else if(this.state.style === 'Chicago') {
      this.bibliography.forEach(metadata => toChicago(metadata));
    } else if(this.state.style === 'Harvard') {
      this.bibliography.forEach(metadata => toHarvard(metadata));
    } else {
      console.log('Invalid style.');
    }
  }

  render() {
    return (
      <div className="body">
        <CopyClipboard bibliography={this.state.bibliography} />
      </div>
    );
  }
}

class CopyClipboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bibliography: props.bibliography,
      copySuccess: ''
    }
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };

  render() {
    return (
      <div>
        <form>
          <textarea className="display" ref={(textarea) => this.textArea = textarea} value={this.state.bibliography} />
        </form>
        {
         document.queryCommandSupported('copy') &&
          <div>
            <button onClick={this.copyToClipboard}>Copy</button> <br />
            {this.state.copySuccess}
          </div>
        }
      </div>
    );
  }
}
