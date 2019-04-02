import React, { Component } from 'react';

const caret = require('../assets/caret.svg');

export default class Dropdown extends Component {
    state = {
        active: false
    }

    render() {
        const { buttonStyle } = this.props;
        const { active } = this.state;
        return (
            <div style={{...styles.body, ...this.props.style}}>
                <div style={styles.container}>
                    <img
                        src={caret}
                        alt='Dropdown'
                        onClick={() => this.setState({ active: !active })}
                        style={buttonStyle}
                    />
                    <div style={active ? {...styles.dropdown, ...styles.visible} : styles.dropdown}>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    body: {
        position: 'relative',
        cursor: 'pointer'
    },
    container: {
        position: 'absolute',
        top: '-10px'
    },
    dropdown: {
        height: '0px',
        left: '0px',
        backgroundColor: 'orange',
        transition: 'all 0.25s'
    },
    visible: {
        height: '100px'
    }
}