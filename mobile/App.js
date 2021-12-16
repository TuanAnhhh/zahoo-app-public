import React from 'react'
import { Provider } from 'react-redux';
import Root from './Root';
import store from './redux/store'


export default function App() {
  return (
    <Provider store={store}>
      {/* <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} /> */}
      <Root />
    </Provider>
  );
}

