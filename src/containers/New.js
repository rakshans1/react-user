import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';

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
    padding: '32px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '304px',
      padding: '24px 8px',
    }
  },
})


class New extends Component {
  state = {
    loading: false,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  onSubmit = (values) => {
    const user = Object.assign({}, values, {createdAt: new Date().toISOString()})
    usersService.addUser(user)
      .then((res) => {
        this.props.addUser(res);
        this.props.history.push('/');
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    const {classes} = this.props;
    const {loading} = this.state;
    return (
      <React.Fragment>
        <Typography variant="display1" className={classes.title}>
            Add user
        </Typography>
        <div className={classes.wrap}>
        <Card className={classes.card}>
          {loading ? <LinearProgress/> : <div className={classes.linearLoader}></div>}
          <UserForm
            mode="new"
            onSubmit={this.onSubmit}
          />
        </Card>
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({

})

// const mapDispatchToProps = {

// }

New = withStyles(styles)(New);
export default connect(mapStateToProps, userActions)(New)
