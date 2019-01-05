import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

import Loading from '../components/Loading';
import LinearProgress from '@material-ui/core/LinearProgress';
import {usersService} from '../services';
import {userActions} from '../actions/usersActions';
import UserForm from '../components/UserForm';

const styles = (theme) => ({
  title: {
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px 0`
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    // height: '100%',
    padding: '0 48px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px'
    }
  },
  loading: {
    height: '100px',
  },
  linearLoader: {
    height: '5px'
  },
  card: {
    minWidth: '480px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '304px',
    }
  },
})


class Edit extends Component {
  state = {
    loading: false,
    userId: null,
    user: null,
    snack: false,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  componentDidMount() {
    document.title = "Edit User | React Users";
    const { match } = this.props;
    const userId = match.params.id;
    this.setState({userId});
    this.getUser(userId);
  }

  getUser(userId) {
    usersService.getUser(userId)
    .then(user => {
      this.setState({user});
    })
    .catch(e => {
        if (e.response.status === 404) {
          this.props.history.push('/');
        }
        console.log(e);
      })
    }

    onSubmit = (values) => {
      this.setState({loading: true});
      const  { userId } = this.state;
      usersService.editUser(userId, values)
      .then((res) => {
        this.props.editUser(res);
        this.setState({snack: true});
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => this.setState({loading: false}))
  }

  handleSnackClose = (event, reason) => {
    this.setState({ snack: false });
  };

  render() {
    const {classes} = this.props;
    const {loading, user} = this.state;
    if (!user) {
      return <Loading/>
    }
    return (
      <React.Fragment>
        <Typography variant="display1" className={classes.title}>
            Edit user
        </Typography>
        <div className={classes.wrap}>
        <Card className={classes.card}>
          {loading ? <LinearProgress/> : <div className={classes.linearLoader}></div>}
          <UserForm
            mode="edit"
            onSubmit={this.onSubmit}
            values={user}
          />
        </Card>
      </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snack}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
          message={<span id="message-id">User Updated.</span>}
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

})

// const mapDispatchToProps = {

// }

Edit = withStyles(styles)(Edit);
export default connect(mapStateToProps, userActions)(Edit)
