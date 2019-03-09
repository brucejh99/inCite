import React, { Component } from 'react';

export default class ExpandableButton extends Component {
    state = {
        hovered: false
    }

    styles = {
        button: {
            height: `${this.props.height}px`,
            width: `${this.props.width}px`,
            fontSize: this.props.fontSize ? `${this.props.fontSize}px` : '12px',
            margin: this.props.margin ? `${this.props.margin}px` : '0',
            textDecoration: 'none',
            textAlign: 'center',
            borderRadius: '0px 10px',
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s',
            ...this.props.style
        },
        expanded: {
            height: `${this.props.height * 1.05}px`,
            width: `${this.props.width * 1.05}px`,
            fontSize: this.props.fontSize ? `${this.props.fontSize * 1.05}px` : '12.6px',
            margin: this.props.margin
                ? `${this.props.margin - 0.025 * this.props.height}px ${this.props.margin - 0.025 * this.props.width}px`
                : '0'
        }
    }

    render() {
        const {
            hoverable = false,
            onClick,
            children
        } = this.props;
        const { hovered } = this.state;
        return (
        <button
            onClick={onClick}
            onMouseEnter={() => this.setState({ hovered: true })}
            onMouseLeave={() => this.setState({ hovered: false })}
            style={hoverable && hovered 
                ? {...this.styles.button, ...this.styles.expanded} 
                : this.styles.button}>
                {children}
        </button>
        )
    }
}
