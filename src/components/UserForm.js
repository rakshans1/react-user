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
    data: {
      avatar: "",
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      mobileNumber: "",
    },
    errors: {
      avatar: false,
      firstName: false,
      lastName: false,
      gender: false,
      dob: false,
      email: false,
      mobileNumber: false,
    },
    formInvalid: false
  };

  static propTypes = {
    mode: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { values, mode } = this.props;
    if (mode === 'new') {
      this.setState({formInvalid: true});
    }
    if (!values) return;
    this.setState({data:values});
  }

  handleChange = name => event =>  {
    const { data:prevData } = this.state;
    const data = { ...prevData }
    data[name] = event.target.value;
    this.setState({
      data: data,
      current: name
    }, this.validateField)
  }

  validateField(all) {
    const { current, data } = this.state;
    const value = this.state.data[current];
    let validationError = {};

    if (all) {
      for(let f in data) {
        validationError[f] = this.validationRules(f, data[f]);
      }
    } else {
      validationError[current] = this.validationRules(current, value);
    }
    const { errors:prevData } = this.state;
    const errors = { ...prevData, ...validationError }
    this.setState({
      errors: errors
    }, this.validateForm);

    let invalid = false;
    for(let f in validationError) {
      if (validationError[f]) {
        invalid = true;
        break;
      }
    }
    return invalid;
  }

  validateForm() {
    let invalid = false;
    const { errors } = this.state;
    for(let f in errors) {
      if (errors[f]) {
        invalid = true;
        break;
      }
    }
    this.setState({formInvalid: invalid});
  }

  validationRules(current, value) {
    let validationError = false;
    switch(current) {
      case 'email':
        const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        validationError = !emailValid;
        break;
      case 'avatar':
        const avatarValid = value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i);
        validationError = !avatarValid;
        break;
      case 'firstName':
      case 'lastName':
      case 'gender':
      case 'dob':
        const isValid = value.length === 0;
        validationError = isValid;
        break;
      default:
        break;
    }
    return validationError;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const result = this.validateField(true);
    console.log(result);
    if (result) return;
    this.props.onSubmit(this.state.data);
  }

  render() {
    const { classes, mode} = this.props;
    const { data, errors } = this.state;
    const shrink = mode === 'edit' ? true : undefined;
    return (
      <React.Fragment>
        <form className={classes.form} autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={10}>
              <div className={classes.textWrap}>
                <TextField
                  required
                  value={data.avatar}
                  label="Avatar url"
                  onChange={this.handleChange('avatar')}
                  className={classes.textField}
                  error={errors.avatar}
                  InputLabelProps={{
                    shrink,
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={2}>
              {data.avatar ? <Avatar src={data.avatar} className={classes.avatar} /> : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.textWrap}>
                <TextField
                  required
                  label="Firstname"
                  value={data.firstName}
                  error={errors.firstName}
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
                  value={data.lastName}
                  error={errors.lastName}
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
                  value={data.gender}
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
                value={data.dob}
                error={errors.dob}
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
                value={data.email}
                error={errors.email}
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
                value={data.mobileNumber}
                error={errors.mobileNumber}
                onChange={this.handleChange('mobileNumber')}
                className={classes.textField}
                InputLabelProps={{
                  shrink,
                }}
              />
            </div>
            </Grid>
          </Grid>
          <Button
            color="primary"
            size="medium"
            variant="raised"
            type="submit"
            // disabled={this.state.formInvalid}
            >{mode ==='edit' ? 'Update user' : 'Add user'}</Button>
        </form>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(UserForm);