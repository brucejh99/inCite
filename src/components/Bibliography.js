import React, { Component } from 'react';
import './Bibliography.css';
import { Button } from '@material-ui/core';
import { getOrSetBibliography, resetBibliography } from '../services/Storage';
import { toAPA, toMLA, toChicago, toHarvard } from '../services/Converter';
import { APASort, MLASort, ChicagoSort, HarvardSort } from  '../services/Sorter';

export default class Bibliography extends Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.reset = this.reset.bind(this);
    this.setBibliography = this.setBibliography.bind(this);
    this.state = {
      style: props.style,
      citationList: '',
      message: ''
    }
  }

  componentDidMount() {
    this.setBibliography();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.style !== this.state.style) {
      this.setState({ style: nextProps.style }, this.setBibliography);
    }
  }

  setBibliography() {
    var bibliography = getOrSetBibliography();
    var list = 'Works Cited\n';
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
      this.setState({ message: 'Select a style to begin.'});
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
    this.setState({ message: 'Copied!' });
  }

  reset() {
    try {
      resetBibliography();
      this.setState({
        citationList: 'Works Cited\n',
      });
    } catch(err) {
      this.setState({
        message: 'Failed to clear bibliography.'
      });
    }
  }

  render() {
    return (
      <div className="body">
      <div className="display" dangerouslySetInnerHTML={{ __html: this.state.citationList }}></div>
        {
         document.queryCommandSupported('copy') &&
          <div>
            <div className="button-container bottom-button">
              <Button className="button" onClick={this.copy}>Copy</Button>
              <Button className="button" onClick={this.reset}>Clear</Button>
            </div>
            {this.state.message}
          </div>
        }
        <div id="copyArea" contenteditable="true"></div>
      </div>
    );
  }
}
