import React, { Component } from 'react';

/**
 * Field class to enter bibliographic information
 * @prop {String} fieldName Name of field, shown in label and placeholder
 * @prop {String} inputType Type of input (text, date etc.)
 */
export default class FormField extends Component {
    onFieldChange = (event) => {
      const fieldName = event.target.name;
      let fieldValue = event.target.value;
  
      if (fieldName === "datePublished" || fieldName === "dateRetrieved") {
        fieldValue = new Date(fieldValue);
      }
  
      this.props.onChange(fieldName, fieldValue);
    }
  
    render() {
      return (
        <label style={styles.tr}>
          <span style={{...styles.td, ...styles.tableName}}>{this.props.fieldName}</span>
          <span style={styles.td}>
            <input className={this.props.fieldName} type={this.props.inputType}
              name={this.props.name} placeholder={this.props.fieldName}
              value={this.props.value} onChange={this.onFieldChange}/>
          </span>
        </label>
      )
    }
}

const styles = {
  tr: {
    display: 'table-row',
    borderBottom: '15px solid transparent'
  },
  td: {
    display: 'table-cell'
  },
  tableName: {
    width: '90px',
    paddingRight: '20px',
    textAlign: 'left'
  }
}