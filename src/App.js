import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import configureStore from './store/configureStore';
import { Provider } from 'react-redux'

import theme from './Theme';

import {authSuccess, authDestroy} from './actions/authActions';
import { authService } from './services';
import sessionTimeout from './utils/sessionTimeout';

import Main from './containers/Main';
import Login from './containers/Login';

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
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Main} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
