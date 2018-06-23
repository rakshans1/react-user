import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import UserTable from '../components/usertable/UserTable';

import {userActions} from '../actions/usersActions';
import {usersService} from '../services';

const styles = (theme) => ({

});

export class Users extends Component {
  static propTypes = {
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
      .catch(e => console.log(e))
  }

  deleteUser = (id) => {
    usersService.deleteUser(id)
    .then((user) => {
      this.props.deleteUser(user);
    })
    .catch(e => console.log(e))
  }

  render() {
    const {users, history} = this.props;
    return (
      <UserTable users={users} history={history} deleteUser={this.deleteUser}/>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})



Users = withStyles(styles)(Users);
export default connect(mapStateToProps, userActions)(Users);
