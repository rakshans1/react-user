import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        <Typography className={classes.title} variant="title" color="inherit">Node Api UI</Typography>
        <Button color="inherit" >Login</Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header);