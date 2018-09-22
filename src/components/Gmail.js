import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

export default class GoogleAuth extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: '',
    }

    redirect = () => {
        
    }
    responseGoogle = response => {
        console.log(response);
    }

    render() {
        let googleContent;

        if (this.state.isLoggedIn) {
            googleContent = null;
        } else {
            googleContent = (<GoogleLogin
                clientId="347852385026-07eihdbaej6cfihhroftq86krbice0bp.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle} />)
        }
        return (
            <div>
                {googleContent}
            </div>
        )
    }
}