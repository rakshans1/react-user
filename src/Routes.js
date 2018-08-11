import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Loadable from 'react-loadable';
import Loading from './components/Loading';

const LoadableLogin = Loadable({
  loader: () => import(/* webpackChunkName: "Login" */'./containers/Login'),
  loading: Loading
});

const LoadableMain = Loadable({
  loader: () => import(/* webpackChunkName: "Main" */'./containers/Main'),
  loading: Loading
});



const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoadableLogin} />
        <Route path="/" component={LoadableMain} />
      </Switch>
    </Router>
  )
}


export default Routes;
