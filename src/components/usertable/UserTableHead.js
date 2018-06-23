import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const columnData = [
  { id: 'avatar', sortable: false,label: 'Avatar' },
  { id: 'firstName', sortable: true,label: 'First Name' },
  { id: 'lastName', sortable: true,label: 'Last Name' },
  { id: 'gender', sortable: true,label: 'Gender' },
  { id: 'age',disablePadding: true, sortable: true,label: 'Age' },
  { id: 'email', sortable: true,label: 'Email' },
  { id: 'mobile',sortable: true,label: 'Mobile' },
];

const UserTableHead = (props) => {
  const {order, orderBy, onRequestSort } = props;
  const createSortHandler =  property => event => onRequestSort(event, property);
  return(
    <TableHead>
      <TableRow>
        {columnData.map(column => {
          return (
            <TableCell
              key={column.id}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
            >
              {column.sortable ? (
                <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
              ) :
                (<React.Fragment>{column.label}</React.Fragment>)
              }
            </TableCell>
          )
        })}
        <TableCell padding="dense"/>
        <TableCell padding="dense"/>
      </TableRow>
    </TableHead>
  )
}

UserTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired
};


export default UserTableHead;
