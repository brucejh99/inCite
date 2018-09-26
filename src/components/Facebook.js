import React, { Component } from 'react';

export default class FacebookNotification extends Component {

    render() {
        // make this dependent on if already logged in
        const fbLogin = (
            <form>
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
        );
        return (
            <div>
                {fbLogin}
            </div>
        )
    }
}
