import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import configureStore from './store/configureStore';
import { Provider } from 'react-redux'

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
        <React.Fragment>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Main} />
            </Switch>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
