import React, { Component } from 'react';

export default class Button extends Component {
  state = {
    hovered: false,
  }

  styles = {
    button: {
      fontFamily: 'Nunito Sans Bold',
      textDecoration: 'none',
      textAlign: 'center',
      borderRadius: '0 10px',
      outline: 'none',
      cursor: 'pointer',
      ...this.props.style
    },
    hovered: {
      backgroundColor: this.props.style.color,
      color: this.props.style.backgroundColor,
    }
  }
  
  render() {
    const {
      onClick,
      invertOnHover = true,
      children,
    } = this.props;
    const { hovered } = this.state;
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        onFocus={() => this.setState({ hovered: true })}
        onBlur={() => this.setState({ hovered: false })}
        style={hovered && invertOnHover
          ? { ...this.styles.button, ...this.styles.hovered }
          : this.styles.button}>
          {children}
        </button>
    );
  }
}
