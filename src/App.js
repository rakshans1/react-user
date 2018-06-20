import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import configureStore from './store/configureStore';
import { Provider } from 'react-redux'
import Routes from './routes';

class App extends Component {
  render() {
    const store = configureStore();
    console.log(store.getState());
    return (
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <Router>
            <Routes/>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
