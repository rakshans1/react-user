import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
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
  return (
    <div className={classes.wrap}>
      <CircularProgress />
    </div>
  )
}


export default withStyles(styles)(Loading);