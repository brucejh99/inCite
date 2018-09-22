import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookAuth extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: '',
    }

    redirect = () => {
        
    }
    responseFacebook = response => {
        console.log(response);
    }

    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = null;
        } else {
            fbContent = (<FacebookLogin
                appId="2277506699194006"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.redirect}
                callback={this.responseFacebook} />);
        }
        return (
            <div>
                {fbContent}
            </div>
        )
    }
}