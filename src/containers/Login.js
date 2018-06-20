import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom';

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
    redirectToReferrer: false,
    username: null,
    password: null,

  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  checkLogin() {
    // fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    // });
  }

  handleChange = name => event =>  {
    this.setState({
      [name]: event.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    if (false) { //TODO: add login check
      return <Redirect to="/" />;
    }
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    // if (redirectToReferrer) {
      // return <Redirect to={from} />;
    // }

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