import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';

const ENTER_KEY = 'Enter';

export default class DropdownTextInput extends PureComponent {
    state = {
        creating: false,
        hovered: false,
        input: '',
        message: ''
    }

    onInput = event => {
        if (event.target.value.length < 30) {
            this.setState({ input: event.target.value, message: '' });
        } else {
            this.setState({ message: "Let's keep it short" });
        }
    }

    onSubmit = event => {
        let success = false;
        if (event.key === ENTER_KEY) {
            success = this.props.handleSubmit(this.state.input);
            if (!success) this.setState({ message: 'This name is already used' });
        }
    }

    render() {
        const { creating, hovered, input, message } = this.state;
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
                    value={input}
                    placeholder={inputText}
                    onChange={this.onInput}
                    onKeyPress={this.onSubmit}
                    style={styles.inputBox}
                />
                <p>{message}</p>
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
        width: '40%',
        outline: 'none',
        padding: '5px'
    },
    errorMessage: {
        width: '40%'
    }
}
