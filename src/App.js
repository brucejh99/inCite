import React from 'react';
import { Provider } from 'mobx-react';
import Store from './stores/Store';
import Navigator from './navigator/Navigator';

export default () => (
  <Provider store={Store}>
    <Navigator />
  </Provider>
);
