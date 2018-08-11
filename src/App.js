import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux'

import theme from './Theme';
import Routes from './Routes';

import {authSuccess, authDestroy} from './actions/authActions';
import { authService } from './services';
import sessionTimeout from './utils/sessionTimeout';

const store = configureStore();

const logout = () => {
  authService.logout();
  store.dispatch(authDestroy());
}



class App extends Component {
  render() {
    const token = authService.isAuthenticated();
    if(token) {
      sessionTimeout(logout);
      store.dispatch(authSuccess(token));
    }

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
