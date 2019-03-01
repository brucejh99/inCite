import React, { Component } from 'react';

/**
 * Scrollable area without scrollbar. Props should be passed as number values in terms of 'px'.
 */
export default class ScrollableArea extends Component {

  wrapper = {
    backgroundColor: this.props.borderColor ? this.props.borderColor : null,
    height: `${this.props.height + 2 * this.props.borderWidth}px`,
    width: `${this.props.width + 2 * this.props.borderWidth}px`,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden'
  }

  outerStyle = {
    height: `${this.props.height}px`,
    width: `${this.props.width}px`,
    backgroundColor: this.props.backgroundColor,
    marginTop: `${this.props.borderWidth}px`,
    // border: 'none',
    overflow: 'hidden'
  }

  innerStyle = {
    height: '100%',
    width: '100%',
    paddingRight: '20px',
    paddingLeft: '20px',
    overflowY: 'scroll'
  }

  render() {
    return (
      <div style={this.wrapper}>
        <div style={this.outerStyle}>
          <div style={this.innerStyle}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
