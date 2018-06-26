import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';

import { authDestroy } from '../actions/authActions';
import {authService} from '../services';
import Users from './Users';
import Edit from './Edit';
import View from './View';
import New from './New';

const styles = (theme) => ({
  main: {
    height: '100%',
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 8}px 0`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 2}px`,
    }
  }
});

export class Main extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  logout = () => {
    authService.logout();
    this.props.authDestroy();
  }

  render() {
    const { classes, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Header logout={this.logout} isAuthenticated={isAuthenticated}/>
        <main className={classes.main}>
          <Switch>
            <Route path="/new" component={New} />
            <Route path="/user/:id" component={View} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/" exact component={Users} />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
  authDestroy
}


Main = withStyles(styles)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(Main);
