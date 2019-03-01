import React, { Component } from 'react';
import './BibliographyView.css';
import { Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import StyleButton from '../../components/StyleButton'
import ScrollableArea from '../../components/ScrollableArea';

class BibliographyView extends Component {
  render() {
    const { bibliography, deleteItem, edit, style, updateStyle } = this.props;

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
            width={300}
            height={300}
            backgroundColor='white'
            borderColor='#FFE455'
            borderWidth={2}
            curved={true}
        >
          {bibliography.map(item => (
              <div></div>
            ))
          }
        </ScrollableArea>
        </div>
        {
          document.queryCommandSupported('copy')
            && (
            <div>
              <div className="button-container bottom-button">
                <Button variant="outlined" color="primary" onClick={this.props.add}>Add</Button>
                <Button variant="outlined" color="primary" onClick={this.props.copy}>Copy</Button>
              </div>
            </div>
            )
          }
        <div id="copyArea" contentEditable="true" />
      </div>
    );
  }
}

export default inject('store')(observer(BibliographyView));