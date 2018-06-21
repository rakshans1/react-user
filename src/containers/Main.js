import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Redirect} from 'react-router';

import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import Table from '../components/Table';

import {auth} from '../services';

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

  logout = () => {
    auth.logout();
    this.setState({ redirectToLogin: true });
  }

  render() {
    const {classes, users} = this.props;
    if (this.state.redirectToLogin) {
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
  users: state.users
})

const mapDispatchToProps = {

}

Main = withStyles(styles)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(Main);
