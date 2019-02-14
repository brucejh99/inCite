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
    const { style } = this.state;
    if (nextProps.style !== style) {
      this.setState({ style: nextProps.style }, this.setBibliography);
    }
  }

  setBibliography() {
    const { style } = this.state;
    const bibliography = getOrSetBibliography();
    if (style === 'APA') this.setState({ sortedBibliography: bibliography.sort(APASort) });
    else if (style === 'MLA') this.setState({ sortedBibliography: bibliography.sort(MLASort) });
    else if (style === 'Chicago') this.setState({ sortedBibliography: bibliography.sort(ChicagoSort) });
    else if (style === 'Harvard') this.setState({ sortedBibliography: bibliography.sort(HarvardSort) });
    else this.setState({ message: 'Select a style to begin.' });
  }

  generateCitation(item) {
    const { style } = this.state;
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

  handleCopyCitation() {
    const copyArea = document.getElementById('copyArea');
    const copyValue = this.state.sortedBibliography.map(item => this.generateCitation(item));
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
        citationList: '',
        sortedBibliography: [],
        message: 'Bibliography cleared'
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
            <List dense style={{ maxHeight: '100%', overflow: 'auto', padding: 0 }}>
              {this.state.sortedBibliography.map(item => (
                <ListItem divider={true} onClick={() => this.props.toggleEdit(item)} className="list-item">
                  <div dangerouslySetInnerHTML={{ __html: this.generateCitation(item) }} className="list-text"/>
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        const bibliography = this.state.sortedBibliography.filter(citation => citation.id !== item.id);
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

class CommandButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    )
  }
}
