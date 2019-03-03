import React, { Component } from 'react';
import './BibliographyView.css';
import { Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import StyleButton from '../../components/StyleButton'
import ScrollableArea from '../../components/ScrollableArea';
import CitationListItem from '../../components/CitationListItem';

class BibliographyView extends Component {
  render() {
    const { bibliography, deleteItem, editItem, style, updateStyle } = this.props;

    return (
      <div className="body">
        <div className="button-container">
            <StyleButton style={style} buttonStyle='MLA' updateStyle={updateStyle} />
            <StyleButton style={style} buttonStyle='APA' updateStyle={updateStyle} />
            <StyleButton style={style} buttonStyle='Chicago' updateStyle={updateStyle} />
            <StyleButton style={style} buttonStyle='Harvard' updateStyle={updateStyle} />
        </div>
        <div className="list-container">
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
          <div>
            <div className="button-container bottom-button">
              <Button variant="outlined" color="primary" onClick={this.props.add}>Add</Button>
              {document.queryCommandSupported('copy')
                ? <Button variant="outlined" color="primary" onClick={this.props.copy}>Copy</Button>
                : null}
            </div>
          </div>
        <div id="copyArea" contentEditable="true" />
      </div>
    );
  }
}

export default inject('store')(observer(BibliographyView));