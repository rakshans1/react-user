import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Main from './containers/Main';
import Login from './containers/Login';
import PrivateRoute from './PrivateRoute';



export default () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={Main} />
    </Switch>
  )
}
