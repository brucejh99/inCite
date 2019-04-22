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
                onClick={onClick}
                style={hovered ? {...styles.container, ...styles.containerHovered} : {...styles.container}}
            >
                <div style={styles.value}>
                    {value}
                </div>
                <div style={styles.buttonContainer}>
                    <img
                        src={deleteIcon}
                        alt='Delete'
                        onMouseEnter={() => this.setState({ deleteHovered: true })} 
                        onMouseLeave={() => this.setState({ deleteHovered: false })}
                        onClick={onDelete}
                        style={deleteHovered ? {...styles.icon, ...styles.iconHovered} : styles.icon} />
                </div>
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
        cursor: 'pointer'
    },
    containerHovered: {
        backgroundColor: '#fff1aa',
    },
    value: {
        fontFamily: 'Nunito Sans',
        fontSize: '14px'
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