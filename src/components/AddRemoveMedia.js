import React, { Component } from 'react';
import './Components.css';

export class AuthenticationForm extends Component {
    constructor(props) {
        super(props);
        this.mediaName = props.mediaName;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log('Submitted authentication form');
    }

    render() {
        const loginForm = (
            <div className="login-form">
                <h3 className="form-title">{this.mediaName} Login:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h3 className="field-name">Username: </h3>
                        <input className="field" type="text" name="name" />
                    </label>
                    <label>
                        <h3 className="field-name">Password: </h3>
                        <input className="field" type="text" password="password" />
                    </label>
                    <input className="submit-button" type="submit" value="Submit" />
                </form>
            </div>
        );
        return (
            <div>
                {loginForm}
            </div>
        )
    }
}

export class AddRemoveMedia extends Component {
    constructor() {
        super();
        this.state = {
            usingFacebook: false,
            usingGmail: false,
        }
    }

    render() {
        return (
            <div>
                AddRemoveMedia goes here
            </div>
        )
    }
}
