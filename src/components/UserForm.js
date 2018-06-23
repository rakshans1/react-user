import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({

  form: {
    display: 'flex',
    padding: '32px',
    flexDirection: 'column'
  },
  textField: {
    width: '100%',
  },
  textWrap: {
    marginBottom: '16px'
  },
  avatar: {
    width: 60,
    height: 60,
  },
})

class UserForm extends Component {
  state = {
    avatar: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    mobileNumber: "",
  };

  static propTypes = {
    mode: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { values } = this.props;
    if (!values) return;
    this.setState(values);
  }

  handleChange = name => event =>  {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //TODO: Validations
    this.props.onSubmit(this.state);
  }

  render() {
    const { classes, mode} = this.props;
    const shrink = mode === 'edit' ? true : undefined;
    return (
      <React.Fragment>
        <form className={classes.form} autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={10}>
              <div className={classes.textWrap}>
                <TextField
                  required
                  value={this.state.avatar}
                  label="Avatar url"
                  onChange={this.handleChange('avatar')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink,
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={2}>
              {this.state.avatar ? <Avatar src={this.state.avatar} className={classes.avatar} /> : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="Firstname"
                  value={this.state.firstName}
                  onChange={this.handleChange('firstName')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink,
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="Lastname"
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink,
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className={classes.textWrap}>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="gender" shrink>Gender</InputLabel>
                <Select
                  value={this.state.gender}
                  onChange={this.handleChange('gender')}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className={classes.textWrap}>
              <TextField
                required
                label="Birthday"
                value={this.state.dob}
                type="date"
                onChange={this.handleChange('dob')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className={classes.textWrap}>
              <TextField
                required
                label="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                className={classes.textField}
                InputLabelProps={{
                  shrink,
                }}
              />
            </div>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className={classes.textWrap}>
              <TextField
                required
                type="number"
                label="Mobile Number"
                value={this.state.mobileNumber}
                onChange={this.handleChange('mobileNumber')}
                className={classes.textField}
                InputLabelProps={{
                  shrink,
                }}
              />
            </div>
            </Grid>
          </Grid>
          <Button color="primary" size="medium" variant="raised"
            type="submit">{mode ==='edit' ? 'Update user' : 'Add user'}</Button>
        </form>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(UserForm);