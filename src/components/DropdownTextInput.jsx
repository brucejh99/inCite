import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';

const ENTER_KEY = 'Enter';

export default class DropdownTextInput extends PureComponent {
    state = {
        creating: false,
        hovered: false,
        input: ''
    }

    onInput = event => this.setState({ input: event.target.value });

    onSubmit = event => {
        if (event.key === ENTER_KEY) {
            this.props.handleSubmit(this.state.input);
        }
    }

    render() {
        const { creating, hovered } = this.state;
        const { inputText } = this.props;
        return (
            creating ?
            <div
                onMouseEnter={() => this.setState({ hovered: true })} 
                onMouseLeave={() => this.setState({ hovered: false })}
                style={hovered ? {...styles.container, ...styles.containerHovered} : {...styles.container}}
            >
                <input
                    type='text'
                    placeholder={inputText}
                    onChange={this.onInput}
                    onKeyPress={this.onSubmit}
                    style={styles.inputBox}
                />
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
        height: '30px',
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
    inputBox: {
        outline: 'none',
        padding: '3px'
    }
}
