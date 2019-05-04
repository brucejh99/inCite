import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';

export default class DropdownTextInput extends PureComponent {
    state = {
        creating: false,
        hovered: false,
        input: ''
    }

    handleSubmit = () => {
        // execute create bibliography with input here
    }

    render() {
        const { creating, hovered, input } = this.state;
        return (
            creating ?
            <div
                onMouseEnter={() => this.setState({ hovered: true })} 
                onMouseLeave={() => this.setState({ hovered: false })}
                style={hovered ? {...styles.container, ...styles.containerHovered} : {...styles.container}}
            >
            {'What up'}
            </div>
            :
            <DropdownItem
                value='Add a new bibliography'
                onClick={() => this.setState({ creating: true })}
            />
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
    }
}
