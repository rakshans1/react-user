import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom';

import {auth} from '../services';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    auth.login(username, password)
      .then((token) => {
        // TODO: Dispatch action here
        this.setState({ redirectToHome: true });
      })
      .catch(e => {
        console.log(e); //TODO: show error in UI
      })
  }

  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.setState({ redirectToHome: true });
    }
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    const {classes} = this.props;
      return (
        <div className={classes.wrap}>
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
        </Card>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default withStyles(styles)(Login);