import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Redirect, Route} from 'react-router';

import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import UserTable from '../components/usertable/UserTable';

import {userActions} from '../actions/usersActions';
import { authDestroy } from '../actions/authActions';
import {authService, usersService} from '../services';

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
    // prop: PropTypes
  }



  componentDidMount() {
    const {users} = this.props;
    if (!users.list.length) {
      this.props.loadUserList();
    }
    usersService.getUsers()
      .then((users) => {
        this.props.fetchUserList(users);
      })
  }

  logout = () => {
    authService.logout();
    this.props.authDestroy();
  }

  render() {
    const {classes, users, isAuthenticated, history} = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Header logout={this.logout}/>
        <main className={classes.main}>
          <UserTable users={users} history={history}/>
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  users: state.users
})

const mapDispatchToProps = {
  ...userActions,
  authDestroy
}


Main = withStyles(styles)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(Main);
