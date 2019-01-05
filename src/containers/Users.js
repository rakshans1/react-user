import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

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
    loading: false,
    snack: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  }

  componentDidMount() {
    document.title = "Home | React Users";
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
      this.setState({ snack: true });
    })
    .catch(e => console.log(e))
    .finally(() => this.setState({loading: false}))
  }

  handleSnackClose = (event, reason) => {
    this.setState({ snack: false });
  };

  render() {
    const { users, history, classes } = this.props;
    const {loading} = this.state;
    return (
      <React.Fragment>
        {loading ? <div className={classes.linearLoader}><LinearProgress/></div> : <div className={classes.linearLoader}></div>}
        <UserTable users={users} history={history} deleteUser={this.deleteUser}/>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snack}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
          message={<span id="message-id">User Deleted.</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})



Users = withStyles(styles)(Users);
export default connect(mapStateToProps, userActions)(Users);
