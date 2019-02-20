import React, { Component } from 'react';
import './Bibliography.css';
import {
  Button, List, ListItem, ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { getBibliography, resetBibliography, updateBibliography, getStyle } from '../services/Storage';
import {
  APASort, MLASort, ChicagoSort, HarvardSort,
} from '../services/Sorter';

export default class Bibliography extends Component {
  static generateCitation(item) {
    const style = getStyle();
    switch (style) {
      case ('APA'):
        return item.apa;
      case ('MLA'):
        return item.mla;
      case ('Chicago'):
        return item.chicago;
      case ('Harvard'):
        return item.harvard;
      default:
        throw new Error('No citation style');
    }
  }

  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.reset = this.reset.bind(this);
    this.setBibliography = this.setBibliography.bind(this);
    this.state = {
      message: '',
      sortedBibliography: {
        style: null,
        citations: [],
      }
    };
  }

  componentDidMount() {
    this.setBibliography();
  }

  setBibliography() {
    const bibliography = getBibliography();
    const style = getStyle();
    if (style === 'APA') {
      bibliography.citations = bibliography.citations.sort(APASort);
      this.setState({ message: '', sortedBibliography: bibliography });
    } else if (style === 'MLA') {
      bibliography.citations = bibliography.citations.sort(MLASort);
      this.setState({ message: '', sortedBibliography: bibliography });
    } else if (style === 'Chicago') {
      bibliography.citations = bibliography.citations.sort(ChicagoSort);
      this.setState({ message: '', sortedBibliography: bibliography });
    } else if (style === 'Harvard') {
      bibliography.citations = bibliography.citations.sort(HarvardSort);
      this.setState({ message: '', sortedBibliography: bibliography });
    } else this.setState({ message: 'Select a style to begin.' });
  }

  handleCopyCitation() {
    const copyArea = document.getElementById('copyArea');
    const copyValue = this.state.sortedBibliography.citations.map(item => Bibliography.generateCitation(item));
    copyArea.innerHTML = copyValue.join('\n');
    copyArea.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
  }

  copy() {
    this.handleCopyCitation();
    this.setState({ message: 'Copied!' });
  }

  reset() {
    try {
      resetBibliography();
      this.setState({
        sortedBibliography: {
          style: null,
          citations: [],
        },
        message: 'Bibliography cleared'
      });
    } catch (err) {
      this.setState({
        message: 'Failed to clear bibliography.',
      });
    }
  }

  render() {
    const citationList = (
      <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
        {this.state.sortedBibliography.citations.map(item => (
          <ListItem divider onClick={() => this.props.toggleEdit(item)} className="list-item">
            <div dangerouslySetInnerHTML={{ __html: Bibliography.generateCitation(item) }} className="list-text"/>
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  const bibliography = this.state.sortedBibliography;
                  bibliography.citations = bibliography.citations.filter(citation => citation.id !== item.id);
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
    );

    return (
      <div className="body">
        <div className="display">
          <div className="list-container">
            {citationList}
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
