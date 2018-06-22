import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    textDecoration: "none",
    color: theme.palette.common.white
  }
});

const Header = (props) => {
  const { classes, isAuthenticated } = props;
  return (
    <AppBar>
      <Toolbar className={classes.flex}>
        <Link to="/" className={classes.title}><Typography variant="title" color="inherit">React Users</Typography></Link>
        {isAuthenticated ? <Button color="inherit" onClick={() => props.logout()}>Logout</Button> : null }
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header);