import React, { Component } from 'react';
import deleteIcon from '../assets/delete-icon.svg';
import { LIGHT_THEME, YELLOW, LIGHT_YELLOW } from '../assets/colors';

export default class DropdownItem extends Component {
    state = {
        hovered: false,
        deleteHovered: false
    }

    render() {
        const { value, onClick, onDelete } = this.props;
        const { hovered, deleteHovered } = this.state;
        return (
            <div
                onMouseEnter={() => this.setState({ hovered: true })} 
                onMouseLeave={() => this.setState({ hovered: false })}
                onClick={deleteHovered ? null : onClick}
                style={hovered ? {...styles.container, ...styles.containerHovered} : {...styles.container}}
            >
                <div style={styles.value}>
                    {value}
                </div>
                {onDelete ?
                <div style={styles.buttonContainer}>
                    <img
                        src={deleteIcon}
                        alt='Delete'
                        onMouseEnter={() => this.setState({ deleteHovered: true })} 
                        onMouseLeave={() => this.setState({ deleteHovered: false })}
                        onClick={onDelete}
                        style={deleteHovered ? {...styles.icon, ...styles.iconHovered} : styles.icon} />
                </div> : null}
            </div>
        );
    }
}

const styles = {
    container: {
        backgroundColor: LIGHT_THEME,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderLeft: '1px solid ' + YELLOW,
        borderRight: '1px solid ' + YELLOW,
        borderBottom: '1px solid ' + YELLOW,
        cursor: 'pointer'
    },
    containerHovered: {
        backgroundColor: LIGHT_YELLOW,
    },
    value: {
        maxWidth: '320px',
        overflow: 'hidden',
        whiteSpace: 'no-wrap',
        textOverflow: 'ellipsis',
        fontFamily: 'Nunito Sans',
        fontSize: '14px',
        lineHeight: '30px'
    },
    buttonContainer: {
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: '15px',
        transition: 'height 0.25s'
    },
    iconHovered: {
        height: '20px'
    }
}
