import React, { Component } from 'react';

export default class ScrollableArea extends Component {

  outerStyle = {
    height: this.props.height,
    width: this.props.width,
    backgroundColor: this.props.backgroundColor,
    borderColor: this.props.borderColor ? this.props.borderColor : 'black',
    borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
    overflow: 'hidden' 
  }

  innerStyle = {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    paddingRight: '20px'
  }

  render() {
    return (
      <div style={this.outerStyle}>
        <div style={this.innerStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
