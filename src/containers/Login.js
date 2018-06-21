import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Loading from '../components/Loading';
import {auth} from '../services';
import {authSuccess} from '../actions/authActions';




const styles = (theme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    padding: '48px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px'
    }
  },
  loading: {
    height: '100px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    height: '400px',
    minWidth: '480px',
    padding: '32px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '304px',
      padding: '24px 8px',
    }
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

  async onSubmit(e) {
    e.preventDefault();
    const {username, password} = this.state;
    if (username === '' || password === '') return;
    this.setState({loading: true});
    auth.login(username, password)
      .then((token) => {
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
        <div className={classes.wrap}>
        <Typography variant="title">
            Login
        </Typography>
        <Card className={classes.card}>
          <form className={classes.form} autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
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
          {loading ? (<div className={classes.loading}><Loading/></div>) : null}
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated
})

const mapDispatchToProps = {
  authSuccess
}

Login = withStyles(styles)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login)