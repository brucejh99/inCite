import React, { Component } from 'react';
import ScrollableArea from './ScrollableArea';

const caret = require('../assets/caret.svg');

export default class Dropdown extends Component {
    state = {
        active: false
    }

    render() {
        return (
            <div style={styles.body}>
                <img
                    src={caret}
                    alt='Dropdown'
                    onClick={() => this.setState({ active: !this.state.active })}
                    style={this.props.buttonStyle}
                />
                {this.state.active ? 
                    <div style={styles.dropdown}>
                        <ScrollableArea
                            width={200}
                            height={250}
                            backgroundColor='red'
                            borderColor='black'
                            borderWidth={1}
                        >
                        <div style={{height: '50px', backgroundColor: 'green'}} />
                        </ScrollableArea>
                    </div> : null}
            </div>
        )
    }
}

const styles = {
    body: {
        position: 'relative',
        cursor: 'pointer'
    },
    dropdown: {
        position: 'absolute',
        right: '0px',
        top: '35px',
        transition: 'all 250 ease-in-out'
    }
}