import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    flex: 1
  }
};

const Header = (props) => {
  const { classes } = props;
  return (
    <AppBar>
      <Toolbar className={classes.flex}>
        <Typography className={classes.title} variant="title" color="inherit">React Users</Typography>
        <Button color="inherit" onClick={() => props.logout()}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header);