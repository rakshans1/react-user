import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import UserTable from '../components/usertable/UserTable';

import {userActions} from '../actions/usersActions';
import {usersService} from '../services';

const styles = (theme) => ({
  linearLoader: {
    height: '5px',
    marginTop: theme.spacing.unit * 4
  },
});

export class Users extends Component {
  state = {
    loading: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
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
    this.setState({loading: true})
    usersService.deleteUser(id)
    .then((user) => {
      this.props.deleteUser(user);
    })
    .catch(e => console.log(e))
    .finally(() => this.setState({loading: false}))
  }

  render() {
    const { users, history, classes } = this.props;
    const {loading} = this.state;
    return (
      <React.Fragment>
        {loading ? <div className={classes.linearLoader}><LinearProgress/></div> : <div className={classes.linearLoader}></div>}
        <UserTable users={users} history={history} deleteUser={this.deleteUser}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})



Users = withStyles(styles)(Users);
export default connect(mapStateToProps, userActions)(Users);
