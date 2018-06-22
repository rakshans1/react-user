import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Main from './containers/Main';
import Login from './containers/Login';
import Edit from './containers/Edit';

export default () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/" exact component={Main} />
    </Switch>
  )
}
