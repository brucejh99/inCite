import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import StyleButton from '../../components/StyleButton'
import ScrollableArea from '../../components/ScrollableArea';
import CitationListItem from '../../components/CitationListItem';

export default class BibliographyView extends Component {
  render() {
    const { bibliography, deleteItem, editItem, style, updateStyle } = this.props;

    return (
      <div style={styles.body}>
        <div style={styles.buttonContainer}>
            <StyleButton style={style} buttonStyle='MLA' updateStyle={updateStyle} />
            <StyleButton style={style} buttonStyle='APA' updateStyle={updateStyle} />
            <StyleButton style={style} buttonStyle='Chicago' updateStyle={updateStyle} />
            <StyleButton style={style} buttonStyle='Harvard' updateStyle={updateStyle} />
        </div>
        <div style={styles.listContainer}>
        <ScrollableArea
            width={345}
            height={300}
            backgroundColor='white'
            borderColor='#fff1aa'
            borderWidth={2}
            curved={true}
        >
          {bibliography.map(item => (
              <CitationListItem
                citationObject={item}
                deleteCitation={() => deleteItem(item)}
                editCitation={() => editItem(item)} />
            ))
          }
        </ScrollableArea>
        </div>
          <div style={{...styles.buttonContainer, ...styles.bottom}}>
            <Button variant="outlined" color="primary" onClick={this.props.add}>Add</Button>
            {document.queryCommandSupported('copy')
              ? <Button variant="outlined" color="primary" onClick={this.props.copy}>Copy</Button>
              : null}
          </div>
        <div id="copyArea" contentEditable="true" style={styles.copyArea} />
      </div>
    );
  }
}

const styles = {
  body: {
    width: '400px',
    background: 'white',
    padding: 0,
    margin: 0
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    border: 'none',
    margin: '20px 0px'
  },
  copyArea: {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '12pt',
    lineHeight: 2,
    position: 'fixed',
    left: '-10000px',
    top: '10000px',
    whiteSpace: 'pre'
  },
  bottom: {
    justifyContent: 'center',
    marginBottom: '20px'
  }
}