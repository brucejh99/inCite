import React, { PureComponent } from 'react';
import {
  Button,
  Dropdown,
  SelectableButton,
  ScrollableArea,
  CitationListItem,
  Modal,
} from '../../components';
import { LIGHT_THEME, RED, YELLOW } from '../../assets/colors';

const loadingGIF = require('../../assets/bookflippp.gif');

export default class BibliographyView extends PureComponent {
  render() {
    const {
      bibliographyName,
      bibliography,
      bibliographyList,
      latestId,
      onSelectBibliography,
      addCitation,
      copy,
      deleteItem,
      editItem,
      bibStyle,
      updateStyle,
      addBibliography,
      deleteBibliography,
      isDuplicate,
      resolveDuplicate,
      parsing
    } = this.props;

    return (
      <div style={styles.body}>
        {isDuplicate ?
          <Modal>
            <p style={styles.modalText}>You are already citing this url in this bibliography. Would you like to replace it?</p>
            <div style={styles.buttonContainer}>
              <Button
                onClick={() => resolveDuplicate('update')}
                style={styles.modalButton}
              >
                Replace
              </Button>
              <Button
                onClick={() => resolveDuplicate('cancel')}
                style={styles.modalButton}
              >
                Cancel
              </Button>
            </div>
          </Modal>
        : null}
        {console.log(isDuplicate)}
        <Dropdown
          value={bibliographyName}
          options={bibliographyList}
          onAdd={addBibliography}
          onDelete={deleteBibliography}
          onSelectBibliography={onSelectBibliography}
          style={styles.dropdown}
        />
        <div style={styles.listHeader}>
          <div>
            <SelectableButton
              selected={bibStyle === 'MLA'}
              onClick={() => updateStyle('MLA')}
              style={styles.styleButton}
            >
              MLA
            </SelectableButton>
            <SelectableButton
              selected={bibStyle === 'APA'}
              onClick={() => updateStyle('APA')}
              style={styles.styleButton}
            >
              APA
            </SelectableButton>
            <SelectableButton
              selected={bibStyle === 'Chicago'}
              onClick={() => updateStyle('Chicago')}
              style={styles.styleButton}
            >
              Chicago
            </SelectableButton>
            <SelectableButton
              selected={bibStyle === 'Harvard'}
              onClick={() => updateStyle('Harvard')}
              style={styles.styleButton}
            >
              Harvard
            </SelectableButton>
          </div>
          {parsing ? <img src={loadingGIF} alt={'Loading...'} style={styles.activityIndicator} /> : null}
        </div>
        <div style={styles.listContainer}>
          <ScrollableArea
            width={345}
            height={300}
            backgroundColor={LIGHT_THEME}
            borderColor={YELLOW}
            borderWidth={1}
            curved
          >
            {bibliography.map(item => (
              <CitationListItem
                citationObject={item}
                deleteCitation={() => deleteItem(item)}
                editCitation={() => editItem(item)}
                isLatest={item.id === latestId}
              />
            ))
            }
          </ScrollableArea>
        </div>
        <div style={{ ...styles.buttonContainer, ...styles.bottom }}>
          <Button
            onClick={addCitation}
            style={styles.bottomButton}
          >
              Add
          </Button>
          {document.queryCommandSupported('copy')
            ? (
              <Button
                onClick={copy}
                style={styles.bottomButton}
              >
                  Copy
              </Button>
            )
            : null}
        </div>
        <div id='copyArea' contentEditable='true' style={styles.copyArea} />
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
  modalText: {
    margin: '5% 0%',
    color: YELLOW,
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '900',
    textAlign: 'center'
  },
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  modalButton: {
    height: '34px',
    width: '75px',
    backgroundColor: 'white',
    color: RED,
    fontSize: '14px',
    margin: '0px 3px',
    border: `1px solid ${RED}`,
  },
  dropdown: {
    width: '347.5px',
    height: '50px',
    padding: '10px 25px',
    marginTop: '2px',
    marginLeft: '2px',
    border: 'none'
  },
  listHeader: {
    width: '344px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 28px'
  },
  buttonContainer: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'left'
  },
  styleButton: {
    height: '34px',
    width: '75px',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '900',
    color: YELLOW,
    backgroundColor: 'white',
    marginLeft: '-1px',
    border: '1px solid ' + YELLOW,
    borderRadius: '0px 12px 0px 0px',
  },
  activityIndicator: {
    height: '30px',
    width: '30px',
    alignSelf: 'top',
    paddingTop: '-4px',
    marginRight: '10px'
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    marginTop: '-1px',
    marginLeft: '1px',
    justifyContent: 'center',
    border: 'none',
  },
  copyArea: {
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '12pt',
    lineHeight: 2,
    position: 'fixed',
    left: '-10000px',
    top: '10000px',
    whiteSpace: 'pre',
  },
  bottom: {
    height: '40px',
    justifyContent: 'center',
    margin: '20px 0px',
  },
  bottomButton: {
    height: '34px',
    width: '75px',
    backgroundColor: 'white',
    color: RED,
    fontSize: '14px',
    margin: '0px 3px',
    border: '1px solid ' + RED,
  },
};
