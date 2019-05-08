import React, { Component } from 'react';
import deleteIcon from '../assets/delete-icon.svg';

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
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderLeft: '1px solid #FFE455',
        borderRight: '1px solid #FFE455',
        borderBottom: '1px solid #FFE455',
        cursor: 'pointer'
    },
    containerHovered: {
        backgroundColor: '#fff1aa',
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
