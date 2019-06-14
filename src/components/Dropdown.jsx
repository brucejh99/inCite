import React, { Component } from 'react';
import DropdownItem from './DropdownItem';
import Title from './Title';
import DropdownTextInput from './DropdownTextInput';

const caret = require('../assets/caret.svg');

export default class Dropdown extends Component {
  state = {
    active: false,
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
        const { active } = this.state;
        return (
            <div style={{...styles.body, ...this.props.style}}>
                <div
                    onClick={() => this.setState({ active: !active })}
                    style={active ?
                    {...styles.headerContainer, ...styles.active} :
                    styles.headerContainer}>
                    <Title>
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
                        <DropdownTextInput
                            inputText={'Name your bibliography'}
                            handleSubmit={name => {
                                const success = onAdd(name);
                                if(success) this.setState({ active: false });
                                return success;
                            }}
                        />
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
};
