import React, { Component } from 'react';

export default class Button extends Component {
    state = {
        hovered: false
    }

    styles = {
        button: {
            height: `${this.props.height}px`,
            width: `${this.props.width}px`,
            textDecoration: 'none',
            textAlign: 'center',
            borderRadius: '0px 10px',
            cursor: 'pointer',
            transition: 'height 0.5s width 0.5s',
            ...this.props.style
        },
        expanded: {
            height: `${this.props.height * 1.1}px`,
            width: `${this.props.width * 1.1}px`
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

const styles = {
    expanded: {

    }
}
