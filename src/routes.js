import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Main from './containers/Main';
import Login from './containers/Login';

export default () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Main} />
    </Switch>
  )
}
