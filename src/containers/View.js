import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from '../components/Loading';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


import getAge from '../utils/getAge';
import { usersService } from '../services';

const styles = theme => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 16,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '640px',
    padding: theme.spacing.unit * 8,
    [theme.breakpoints.down('sm')]: {
      minWidth: '304px',
      padding: theme.spacing.unit * 2,
    }
  },
  avatar: {
    width: '150px',
    height: '150px',
    marginTop: '-125px'
  },
  info: {
    width: '100%',
    display: 'flex',
    marginBottom: theme.spacing.unit * 2
  },
  infoTitle: {
    color: theme.palette.common.black,
    fontWeight: 700,
    width: '20%'
  },
  infoWrap: {
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      padding: '16px 0 0 0',
    },
    width: '100%'
  },
  capitalize: {
    textTransform: 'capitalize'
  }
})
class View extends Component {
  state = {
    userId: null,
    user: null,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  componentDidMount() {
    document.title = "View | React Users";
    const { match } = this.props;
    const userId = match.params.id;
    this.setState({ userId });
    this.getUser(userId);
  }

  getUser(userId) {
    usersService.getUser(userId)
      .then(user => {
        this.setState({ user });
      })
      .catch(e => {
        if (e.response.status === 404) {
          this.props.history.push('/');
        }
        console.log(e);
      })
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    if (!user) {
      return <Loading />
    }
    return (
      <div className={classes.wrap}>
        <Paper className={classes.paper}>
          <Avatar src={user.avatar} className={classes.avatar}/>
          <Typography variant="display1" color="primary">{`${user.firstName} ${user.lastName}`}</Typography>
          <div className={classes.infoWrap}>
            <Typography className={classes.info}><span className={classes.infoTitle}>Age: </span><span>{getAge(user.dob)}</span></Typography>
            <Typography className={classes.info}><span className={classes.infoTitle}>Gender: </span><span className={classes.capitalize}>{user.gender}</span></Typography>
            <Typography className={classes.info}><span className={classes.infoTitle}>Email: </span><span>{user.email}</span></Typography>
            <Typography className={classes.info}><span className={classes.infoTitle}>Mobile: </span><span>{user.mobileNumber}</span></Typography>
          </div>
          </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(View);
