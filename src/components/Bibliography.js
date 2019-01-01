import React, { Component } from 'react';
import './Bibliography.css';
import { getOrSetBibliography, resetBibliography } from '../services/Storage';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';
import { APASort, MLASort, ChicagoSort, HarvardSort } from  '../services/Sorter';

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
    var bibliography = getOrSetBibliography();
    var list = '';
    if(this.state.style === 'APA') {
      bibliography.sort(APASort);
      bibliography.forEach(metadata => list += toAPA(metadata) + '\n');
    } else if(this.state.style === 'MLA') {
      bibliography.sort(MLASort);
      bibliography.forEach(metadata => list += toMLA(metadata) + '\n');
    } else if(this.state.style === 'Chicago') {
      bibliography.sort(ChicagoSort);
      bibliography.forEach(metadata => list += toChicago(metadata) + '\n');
    } else if(this.state.style === 'Harvard') {
      bibliography.sort(HarvardSort);
      bibliography.forEach(metadata => list += toHarvard(metadata) + '\n');
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
    this.handleCopyCitation(this.state.citationList);
    this.setState({ copySuccess: 'Copied!' });
  }

  render() {
    return (
      <div className="body">
      <div className="display">
        <div dangerouslySetInnerHTML={{ __html: this.state.citationList }}></div>
      </div>
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
