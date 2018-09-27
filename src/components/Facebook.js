import React, { Component } from 'react';
const request = require('request');

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
            // put notification number component here
            <div></div>
        );
    }
}
