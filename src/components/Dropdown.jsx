import React, { Component } from 'react';
import DropdownItem from './DropdownItem';
import Title from './Title';

const caret = require('../assets/caret.svg');

export default class Dropdown extends Component {
    state = {
        active: false
    }

    onItemClick = option => {
        this.props.onSelectBibliography(option);
        this.setState({ active: false });
    }

    render() {
        const {
            value,
            options,
            onAdd,
            onDelete
        } = this.props;
        const { active, creating } = this.state;
        return (
            <div
                // onClick={() => this.setState({ active: !active })}
                style={{...styles.body, ...this.props.style}}
            >
                <div
                    onClick={() => this.setState({ active: !active })}
                    style={active ?
                    {...styles.headerContainer, ...styles.active} :
                    styles.headerContainer}>
                    <Title style={styles.title}>
                        {value}
                    </Title>
                    <img
                        src={caret}
                        alt='Dropdown'
                        style={styles.icon}
                    />
                </div>
                {active ?
                    <div style={styles.dropdown}>
                        {options.map(option => 
                            <DropdownItem
                                value={option}
                                onClick={() => this.onItemClick(option)}
                                onDelete={() => onDelete(option)}
                            />
                        )}
                        {
                            creating ?
                            null
                            :
                            <DropdownItem
                                value='Add a new bibliography'
                                onClick={() => {
                                    let name = 'Bibliography ';
                                    let number = 1;
                                    while(options.includes(name + number)) {
                                        number++;
                                    }
                                    onAdd(name + number);
                                }}
                            />
                        }
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

const styles = {
    body: {
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'wrap'
    },
    title: {
        width: '317px'
    },
    headerContainer: {
        height: '30px',
        padding: '10px 0px',
        display: 'flex',
        alignItems: 'center'
    },
    dropdown: {
        maxHeight: '400px',
        width: '100%',
        overflowY: 'auto'
    },
    active: {
        border: '1px solid FFE455',
        borderRadius: '0px 10px 0px 0px',
        backgroundColor: 'white'
    },
    icon: {
        verticalAlign: 'center'
    },
    option: {
        width: '100%',
        padding: '2.5px 2.5px',
        fontFamily: 'Nunito Sans',
        fontSize: '14px'
    }
}
