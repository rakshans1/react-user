import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

const columnData = [
  { id: 'avatar', label: 'Avatar' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'age',label: 'Age' },
  { id: 'email', label: 'Email' },
  { id: 'mobile',label: 'Mobile' },
];

class UserTableHead extends Component {
  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;
    return(
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                padding={column.disablePadding ? 'none' : 'default'}
              >
              {column.label}
              </TableCell>
            )
          })}
          <TableCell padding="dense">
          </TableCell>
        </TableRow>
      </TableHead>
    )
  }
}

UserTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default UserTableHead;
