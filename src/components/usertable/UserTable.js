import React, { Component } from 'react';
import PropTypes from 'prop-types'

import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';


import UserTableToolbar from './UserTableToolbar';
import UserTableHead from './UserTableHead';
import UserTableBody from './UserTableBody';
import Loading from '../Loading';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 4
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


class UserTable extends Component {
  state = {
    order: 'desc',
    orderBy: 'createdAt',
    page: 0,
    rowsPerPage: 20,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleEdit = (event, id) => {
    event.stopPropagation();
    this.props.history.push(`/edit/${id}`);
  }

  render() {
    const {classes, users, deleteUser} = this.props;

    const { order, orderBy, rowsPerPage, page } = this.state;
    if (users.isLoading) {
      return <Loading/>
    }
    return (
      <Paper className={classes.root}>
        <UserTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="users table">
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
              <TableBody>
                <UserTableBody
                  list={users.list}
                  page={page}
                  perPage={rowsPerPage}
                  isSelectedfn={this.isSelected}
                  handleClick={this.handleClick}
                  editUser={this.handleEdit}
                  deleteUser={deleteUser}
                  order={order}
                  orderBy={orderBy}
                />
              </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={users.list.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelRowsPerPage="Users per page"
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(UserTable);
