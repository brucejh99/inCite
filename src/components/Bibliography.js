import React, { Component } from 'react';
import './Bibliography.css';
import { getOrSetBibliography, resetBibliography } from '../services/Storage';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';

export default class Bibliography extends Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.state = {
      style: props.style,
      citationList: '',
      copySuccess: ''
    }
  }

  componentDidMount() {
    const bibliography = getOrSetBibliography();
    var list = '';
    if(this.state.style === 'APA') {
      bibliography.forEach(metadata => list += toAPA(metadata) + '\n');
    } else if(this.state.style === 'MLA') {
      bibliography.forEach(metadata => toMLA(metadata));
    } else if(this.state.style === 'Chicago') {
      bibliography.forEach(metadata => toChicago(metadata));
    } else if(this.state.style === 'Harvard') {
      bibliography.forEach(metadata => toHarvard(metadata));
    } else {
      console.log('Invalid style.');
    }
    this.setState({ citationList: list });
  }


  handleCopyCitation(citationText) {
    let copyArea = document.getElementById("copyArea");
    copyArea.innerHTML = citationText;
    copyArea.focus();
    document.execCommand("selectAll");
    document.execCommand("copy");
  }
  
  copy() {
    console.log(this.state.citationList);
    this.handleCopyCitation(this.state.citationList);
  }

  render() {
    return (
      <div className="body">
        <textarea className="display" ref={(textarea) => this.textArea = textarea} value={this.state.citationList} />
        {
         document.queryCommandSupported('copy') &&
          <div>
            <button onClick={this.copy}>Copy</button> <br />
            {this.state.copySuccess}
          </div>
        }
        <div id="copyArea" contenteditable="true"></div>
      </div>
    );
  }
}
