import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Loading from '../components/Loading';
import {usersService} from '../services';
import {userActions} from '../actions/usersActions';

const styles = (theme) => ({
  title: {
    textAlign: 'center',
    padding: '48px 24px'
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    padding: '0 48px',
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
    minWidth: '480px',
    padding: '32px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '304px',
      padding: '24px 8px',
    }
  },
  textField: {
    width: '448px',
    [theme.breakpoints.down('sm')]: {
      width: '288px',
    }
  },
  textWrap: {
    marginBottom: '16px'
  }
})


class Edit extends Component {
  state = {
    loading: false,
    redirectToHome: false,
    username: null,
    password: null,
  };

  static propTypes = {
  }

  handleChange = name => event =>  {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const {classes} = this.props;
    const {loading} = this.state;
    return (
      <React.Fragment>
        <Typography variant="display1" className={classes.title}>
            Edit user
        </Typography>
        <div className={classes.wrap}>
        <Card className={classes.card}>
          <form className={classes.form} autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="Avatar"
                  onChange={this.handleChange('avatar')}
                  className={classes.textField}
                />
              </div>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="Firstname"
                  onChange={this.handleChange('firstname')}
                  className={classes.textField}
                />
              </div>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="Lastname"
                  onChange={this.handleChange('lastname')}
                  className={classes.textField}
                />
              </div>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="gender"
                  onChange={this.handleChange('gender')}
                  className={classes.textField}
                />
              </div>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="dob"
                  onChange={this.handleChange('dob')}
                  className={classes.textField}
                />
              </div>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="email"
                  onChange={this.handleChange('email')}
                  className={classes.textField}
                />
              </div>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="Mobile Number"
                  onChange={this.handleChange('mobile')}
                  className={classes.textField}
                />
              </div>
            <Button color="primary" size="medium" variant="raised"
            type="submit">Login</Button>
          </form>
          {loading ? (<div className={classes.loading}><Loading/></div>) : null}
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

Edit = withStyles(styles)(Edit);
export default connect(mapStateToProps, userActions)(Edit)
