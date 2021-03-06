import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { YELLOW } from '../assets/colors';

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} value Value of the variable, updates the field
 * @prop {Func} onChange Handler for when value changes
 */
export default class FormField extends Component {
  onFieldChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

      const { onChange } = this.props;
      onChange(fieldName, fieldValue);
    }

    render() {
      const {
        fieldName, value,
      } = this.props;

      return (
        <label htmlFor={fieldName} style={styles.tr}>
          <span style={{ ...styles.td, ...styles.tableName }}>{fieldName}</span>
          <span style={styles.td}>
            <input
              id={fieldName}
              type='text'
              name={fieldName}
              placeholder={fieldName}
              value={value}
              onChange={this.onFieldChange}
              style={styles.textbox}
            />
          </span>
        </label>
      );
    }
}

FormField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const styles = {
  tr: {
    display: 'table-row',
    borderBottom: '15px solid transparent',
  },
  td: {
    display: 'table-cell',
  },
  tableName: {
    width: '90px',
    paddingRight: '20px',
    textAlign: 'left',
  },
  textbox: {
    width: '150px',
    padding: '5px',
    border: '1px solid ' + YELLOW,
    borderRadius: '0px 10px 0px 10px',
    outline: 'none'
  },
};
