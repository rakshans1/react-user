import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Redirect} from 'react-router';

import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import Table from '../components/Table';

import {userActions} from '../actions/usersActions';
import { authDestroy } from '../actions/authActions';
import {auth, users} from '../services';

const styles = (theme) => ({
  main: {
    height: '100%',
    marginTop: '64px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '48px',
    }
  }
});

export class Main extends Component {
  state = {
    redirectToLogin: false,

  };

  static propTypes = {
    // prop: PropTypes
  }



  componentDidMount() {
    this.props.loadUserList();
    users.getUsers()
      .then((users) => {
        this.props.fetchUserList(users);
      })
  }

  logout = () => {
    auth.logout();
    this.props.authDestroy();
  }

  render() {
    const {classes, users, isAuthenticated} = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Header logout={this.logout}/>
        <main className={classes.main}>
          <Table users={users}/>
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
