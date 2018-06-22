import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, Tab } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit'

import getAge from '../../utils/getAge';

const styles = (theme) => ({
  row: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
})

class UserTableBody extends Component {
  render() {
    const {list, page, perPage, classes, handleClick, isSelectedfn, edit} = this.props;
    return (
      <React.Fragment>
      {list.slice(page * perPage, page * perPage + perPage).map(user => {
        const isSelected = isSelectedfn(user.id);
        return(
          <TableRow
            hover
            key={user.id}
            className={classes.row}
            onClick={event => handleClick(event, user.id)}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            selected={isSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isSelected} />
            </TableCell>
            <TableCell>
              <Avatar alt={user.firstName} src={user.avatar}/>
            </TableCell>
            <TableCell>
              {user.firstName}
            </TableCell>
            <TableCell>
              {user.lastName}
            </TableCell>
            <TableCell>
              {user.gender ? 'Male' : 'Female'}
            </TableCell>
            <TableCell>
              {getAge(user.dob)}
            </TableCell>
            <TableCell>
              {user.email}
            </TableCell>
            <TableCell>
              {user.mobileNumber}
            </TableCell>
            <TableCell>
              <EditIcon onClick={(e) => edit(e, user.id)} />
            </TableCell>
          </TableRow>
        )
      })}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(UserTableBody);