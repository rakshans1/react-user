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
import {authService, usersService} from '../services';
import Users from './Users';
import Edit from './Edit';

const styles = (theme) => ({
  main: {
    height: '100%',
    margin: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 10}px`,
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 2}px`,
    }
  }
});

export class Main extends Component {
  static propTypes = {
  }



  componentDidMount() {

  }

  logout = () => {
    authService.logout();
    this.props.authDestroy();
  }

  render() {
    const {classes, isAuthenticated} = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Header logout={this.logout} isAuthenticated={isAuthenticated}/>
        <main className={classes.main}>
          <Switch>
            <Route path="/edit/:id" component={Edit} />
            <Route path="/" component={Users} />
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
