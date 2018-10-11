import React, { Component } from 'react';
import './Components.css';

const settingsIcon = require('../assets/settings-icon.png')

export default class Settings extends Component {
    render() {
        return(
            <img src={settingsIcon} className="test-page" />
        )
    }
}
