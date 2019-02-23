import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Store from './services/Store';
import Navigator from './components/Navigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigator />
      </Provider>
    );
  }
}
