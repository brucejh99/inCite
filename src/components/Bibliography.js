import React, { Component } from 'react';
import './Bibliography.css';
import { getOrSetBibliography, resetBibliography } from '../services/Storage';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';

export default class Bibliography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: props.style,
      bibliography: getOrSetBibliography()
    }
  }

  // TODO: loop through bibliography array and convert based on type

  render() {
    return (
      <div className="body">
        <header className="splash">
          <h1 className="title">Bibliography</h1>
        </header>
        <body>
          <CopyClipboard bibliography={this.state.bibliography} />
        </body>
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
          <textarea ref={(textarea) => this.textArea = textarea} value={this.state.bibliography} />
        </form>
        {
         document.queryCommandSupported('copy') &&
          <div>
            <button onClick={this.copyToClipboard}>Copy</button> 
            {this.state.copySuccess}
          </div>
        }
      </div>
    );
  }
}
