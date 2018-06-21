import React, { Component } from 'react';

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
    marginTop: theme.spacing.unit * 3,
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
    page: 0,
    rowsPerPage: 20,
    selected: [],
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.users.list.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {classes, users} = this.props;

    const { rowsPerPage, page, selected } = this.state;
    if (users.isLoading) {
      return <Loading/>
    }
    return (
      <Paper className={classes.root}>
        <UserTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="users table">
              <UserTableHead
                numSelected={selected.length}
                onSelectAllClick={this.handleSelectAllClick}
                rowCount={users.list.length}
              />
              <TableBody>
                <UserTableBody
                  list={users.list}
                  page={page}
                  perPage={rowsPerPage}
                  isSelectedfn={this.isSelected}
                  handleClick={this.handleClick}
                  />
              </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={users.list.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions="0"
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
