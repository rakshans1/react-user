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

import Loadable from 'react-loadable';

import theme from './Theme';

import {authSuccess, authDestroy} from './actions/authActions';
import { authService } from './services';
import sessionTimeout from './utils/sessionTimeout';

import Loading from './components/Loading';

const store = configureStore();

const logout = () => {
  authService.logout();
  store.dispatch(authDestroy());
}

const LoadableLogin = Loadable({
  loader: () => import('./containers/Login'),
  loading: Loading
});

const LoadableMain = Loadable({
  loader: () => import('./containers/Main'),
  loading: Loading
});

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
          <Router>
            <Switch>
              <Route path="/login" component={LoadableLogin} />
              <Route path="/" component={LoadableMain} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
