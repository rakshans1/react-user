import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

const UserTableToolbar =  (props) => {
  const {classes } = props;
  return (
    <Toolbar
      className={classes.root}
    >

      <div className={classes.title}>
        <Typography variant="title" id="tableTitle">
          Users
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Link to="/new">
          <IconButton aria-label="New user">
            <AddIcon />
          </IconButton>
        </Link>
      </div>
    </Toolbar>
  )
}

UserTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserTableToolbar);
