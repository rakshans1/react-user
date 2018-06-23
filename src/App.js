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

import {authSuccess} from './actions/authActions';
import { authService } from './services';

import Main from './containers/Main';
import Login from './containers/Login';

class App extends Component {
  render() {
    const store = configureStore();
    const token = authService.isAuthenticated()
    if(token) {
      store.dispatch(authSuccess(token));
    }

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
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
