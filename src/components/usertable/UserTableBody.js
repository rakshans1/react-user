import React from 'react';
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'

import getAge from '../../utils/getAge';

const styles = (theme) => ({
  row: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  },
  capitalize: {
    textTransform: 'capitalize'
  }
})

const sortRow = (order, orderBy) => {
  return order === 'desc'
  ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
  : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const UserTableBody = (props) => {
  const { list, page, perPage, order, orderBy, classes, editUser, deleteUser, viewUser } = props;
    return (
      <React.Fragment>
      {list
        .sort(sortRow(order, orderBy))
        .slice(page * perPage, page * perPage + perPage).map(user => {
        return(
          <TableRow
            hover
            key={user.id}
            className={classes.row}
            tabIndex={-1}
            onClick={(e) => viewUser(e, user.id)}
          >
            <TableCell>
              <Avatar alt={user.firstName} src={user.avatar}/>
            </TableCell>
            <TableCell className={classes.capitalize}>
              {user.firstName}
            </TableCell>
            <TableCell className={classes.capitalize}>
              {user.lastName}
            </TableCell>
            <TableCell className={classes.capitalize}>
              {user.gender}
            </TableCell>
            <TableCell padding="none">
              {getAge(user.dob)}
            </TableCell>
            <TableCell>
              {user.email}
            </TableCell>
            <TableCell>
              {user.mobileNumber}
            </TableCell>
            <TableCell padding="checkbox">
              <EditIcon color="secondary" onClick={(e) => editUser(e, user.id)} />
            </TableCell>
            <TableCell padding="checkbox">
              <DeleteIcon color="secondary" onClick={(e) => deleteUser(user.id)} />
            </TableCell>
          </TableRow>
        )
      })}
      </React.Fragment>
    )
}

UserTableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  viewUser: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
}

export default withStyles(styles)(UserTableBody);