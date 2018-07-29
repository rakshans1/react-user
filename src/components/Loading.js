import React from 'react'
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  wrap: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Loading = (props) => {
  const { classes } = props;
  console.log(props);
  if (props.error) {
    return (
      <div className={classes.wrap}>
        <Button variant="contained" color="primary"  onClick={ props.retry }>Retry</Button>
      </div>
    )
  } else if (props.pastDelay) {
    return (
      <div className={classes.wrap}>
        <CircularProgress />
      </div>
    )
  } else {
    return null;
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading);
