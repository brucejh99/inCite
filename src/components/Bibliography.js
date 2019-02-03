import React, { Component } from 'react';
import './Bibliography.css';
import {
  Button, List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { getOrSetBibliography, resetBibliography, updateBibliography } from '../services/Storage';
import {
  APASort, MLASort, ChicagoSort, HarvardSort,
} from '../services/Sorter';

export default class Bibliography extends Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.reset = this.reset.bind(this);
    this.setBibliography = this.setBibliography.bind(this);
    this.state = {
      style: props.style,
      message: '',
      sortedBibliography: [],
    };
  }

  componentDidMount() {
    this.setBibliography();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.style !== this.state.style) {
      this.setState({ style: nextProps.style }, this.setBibliography);
    }
  }

  setBibliography() {
    const bibliography = getOrSetBibliography();
    if (this.state.style === 'APA') this.setState({ sortedBibliography: bibliography.sort(APASort) });
    else if (this.state.style === 'MLA') this.setState({ sortedBibliography: bibliography.sort(MLASort) });
    else if (this.state.style === 'Chicago') this.setState({ sortedBibliography: bibliography.sort(ChicagoSort) });
    else if (this.state.style === 'Harvard') this.setState({ sortedBibliography: bibliography.sort(HarvardSort) });
    else this.setState({ message: 'Select a style to begin.' });
  }

  generateCitation(item) {
    switch (this.state.style) {
      case ('APA'):
        return item.apa;
      case ('MLA'):
        return item.mla;
      case ('Chicago'):
        return item.chicago;
      case ('Harvard'):
        return item.harvard;
    }
  }

  handleCopyCitation(citationText) {
    const copyArea = document.getElementById('copyArea');
    copyArea.innerHTML = citationText;
    copyArea.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
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
    } catch (err) {
      this.setState({
        message: 'Failed to clear bibliography.',
      });
    }
  }

  render() {
    return (
      <div className="body">
        <div className="display">
          <div className="list-container">
            <List dense={true} style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
              {this.state.sortedBibliography.map(item => (
                <ListItem divider={true} className="list-item">
                  <div dangerouslySetInnerHTML={{ __html: this.generateCitation(item) }} className="list-text" />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        const id = item.id;
                        const bibliography = this.state.sortedBibliography.filter(citation => citation.id !== id);
                        this.setState({ sortedBibliography: bibliography }, () => updateBibliography(bibliography));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
            </List>
          </div>
        </div>
        {
          document.queryCommandSupported('copy')
            && (
            <div>
              <div className="button-container bottom-button">
                <Button variant="outlined" color="primary" onClick={this.copy}>Copy</Button>
                <Button variant="outlined" color="primary" onClick={this.reset}>Clear</Button>
              </div>
              {this.state.message}
            </div>
            )
          }
        <div id="copyArea" contentEditable="true" />
      </div>
    );
  }
}
