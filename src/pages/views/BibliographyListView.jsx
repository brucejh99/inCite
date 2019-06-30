import React, { Component } from 'react';
import { Button } from '../../components';
import { ORANGE, ORANGE_TRANSPARENT, GRADIENT } from '../../assets/colors';

const styles = {
  body: {
    width: '400px',
    height: '487px',
    background: GRADIENT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    margin: 0,
    textAlign: 'center',
    fontFamily: 'Oleo Script',
    color: 'white',
    fontSize: '64pt',
  },
  startButton: {
    height: '34px',
    width: '200px',
    backgroundColor: ORANGE_TRANSPARENT,
    color: 'white',
    fontSize: '14px',
    margin: '0px 3px',
    border: 'none',
  },
  createBibliographyDiv: {
    textAlign: 'center',
  },
  createButton: {
    height: '34px',
    width: '80px',
    backgroundColor: ORANGE_TRANSPARENT,
    color: 'white',
    fontSize: '14px',
    margin: '10px 3px 0px',
    border: 'none',
  },
  bibliographyNameField: {
    width: '200px',
    padding: '5px',
    color: ORANGE,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
    borderBottom: '3px solid ' + ORANGE_TRANSPARENT,
    outline: 'none',
  },
};

export default class BibliographyListView extends Component {
  onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const { onChange } = this.props;
    onChange(fieldName, fieldValue);
  }

  render() {
    const {
      started,
      name,
      onChange,
      submitName
    } = this.props;

    return (
      <div style={styles.body}>
        <h1 style={styles.header}>inCite</h1>
        { started ? (
          <div style={styles.createBibliographyDiv}>
            <style dangerouslySetInnerHTML={{
              __html: `input::placeholder { color: ${ORANGE}; }`
            }}
            />
            <input
              type='text'
              name='name'
              placeholder='Name your bibliography'
              autoComplete='off'
              value={name}
              onChange={this.onFieldChange}
              style={styles.bibliographyNameField}
            />
            <br />
            <Button
              onClick={submitName}
              invertOnHover={false}
              style={styles.createButton}
            >
              Create
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => onChange('started', true)}
            invertOnHover={false}
            style={styles.startButton}
          >
            Start a new citation
          </Button>
        )}
      </div>
    );
  }
}
