import React, { Component } from 'react';

export default class DropdownItem extends Component {
    state = {
        hovered: false
    }

    render() {
        const { value, onClick } = this.props;
        const { hovered } = this.state;
        return (
            <div
                onMouseEnter={() => this.setState({ hovered: true })} 
                onMouseLeave={() => this.setState({ hovered: false })}
                onClick={onClick}
                style={hovered ? {...styles.container, ...styles.containerHovered} : {...styles.container}}
            >
                <p style={styles.text}>
                    {value}
                </p>
                {/* <div
                    style={styles.buttonContainer}>
                    <img
                        src={deleteIcon}
                        alt='Delete'
                        onMouseEnter={() => this.setState({ deleteHovered: true })} 
                        onMouseLeave={() => this.setState({ deleteHovered: false })}
                        onClick={deleteCitation}
                        style={deleteHovered ? {...styles.icon, ...styles.iconHovered} : styles.icon} />
                </div> */}
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
    text: {
        fontFamily: 'Nunito Sans',
        fontSize: '14px'
    }
    // buttonContainer: {
    //     width: '30px',
    //     height: '30px',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // icon: {
    //     height: '15px',
    //     transition: 'height 0.25s'
    // },
    // iconHovered: {
    //     height: '20px'
    // }
}
