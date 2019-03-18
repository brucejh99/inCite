import React, { Component } from 'react';
import Dropdown from 'react-dropdown-select';

const caret = require('../assets/caret.svg');

export default class MyDropdown extends Component {
    state = {
        active: false
    }

    render() {
        const { buttonStyle } = this.props;
        const { active } = this.state;
        return (
            <div style={styles.body}>
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
    dropdown: { // TODO: this transition style should be used for dropdown instead of container div itself
        height: '0px',
        left: '0px',
        backgroundColor: 'orange',
        transition: 'all 0.25s'
    },
    visible: {
        height: '100px'
    }
}