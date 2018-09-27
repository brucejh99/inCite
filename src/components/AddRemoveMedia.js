import React, { Component } from 'react';

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
            <div>
                <h3>{this.mediaName} Login:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Password:
                        <input type="text" password="password" />
                    </label>
                    <input type="submit" value="Submit" />
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
        let facebookAuth;
        let gmailAuth;

        if(this.state.usingFacebook) {
            facebookAuth = <button onClick={this.handleLogout} />
        } else {
            facebookAuth = <button onClick={this.handleLogin} />
        }

        return (
            <div>

            </div>
        )
    }
}
