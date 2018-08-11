import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import {authService} from '../services';
import {authSuccess, authDestroy} from '../actions/authActions';
import sessionTimeout from '../utils/sessionTimeout';

const styles = (theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    padding: '0 48px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px'
    }
  },
  title: {
    textAlign: 'center',
    padding: '48px 24px',
  },
  loading: {
    height: '100px',
  },
  linearLoader: {
    height: '5px'
  },
  card: {
    height: '400px',
    minWidth: '480px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '304px',
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
  },
  textField: {
    width: '448px',
    // paddingBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      width: '288px',
    }
  },
  textWrap: {
    marginBottom: '16px'
  }
})


export class Login extends Component {
  state = {
    loading: false,
    redirectToHome: false,
    username: null,
    password: null,

  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  handleChange = name => event =>  {
    this.setState({
      [name]: event.target.value
    })
  }

  logout = () => {
    authService.logout();
    this.props.authDestroy();
  }

  async onSubmit(e) {
    e.preventDefault();
    const {username, password} = this.state;
    if (username === '' || password === '') return;
    this.setState({loading: true});
    authService.login(username, password)
      .then((token) => {
        sessionTimeout(this.logout);
        this.props.authSuccess(token);
      })
      .catch(e => {
        console.log(e); //TODO: show error in UI
      })
      .finally(() => {
        this.setState({loading: false});
      })
  }

  render() {
    const {classes, isAuthenticated} = this.props;
    const {loading} = this.state;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

      return (
        <React.Fragment>
        <Typography className={classes.title} variant="display1">Login</Typography>
        <div className={classes.wrap}>
        <Card className={classes.card}>
          {loading ? <LinearProgress/> : <div className={classes.linearLoader}></div>}
          <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
            <div className={classes.textWrap}>
            <TextField
              required
              label="Username"
              onChange={this.handleChange('username')}
              className={classes.textField}
            />
            </div>
            <div className={classes.textWrap}>
            <TextField
              required
              type="password"
              label="Password"
              onChange={this.handleChange('password')}
              className={classes.textField}
            />
            </div>
            <Button color="primary" size="medium" variant="raised"
            type="submit">Login</Button>
          </form>

        </Card>
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated
})

const mapDispatchToProps = {
  authSuccess,
  authDestroy
}

Login = withStyles(styles)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login)
