import React, { Component } from 'react';
const request = require('request');

export class FacebookAuth extends Component {
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

export class FacebookNotification extends Component {
    constructor() {
        super();
        this.getNotifications = this.getNotifications.bind(this);
        this.count = 0;
        this.state = {};
    }

    getNotifications() {
        request('https://notification-hub-facebook.herokuapp.com/facebook/new-notifications', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            this.count = body.length;
            console.log(this.count);
        });
    }

    render() {
        this.getNotifications();
        return ( 
            <div>
            </div>
        );
    }
}
