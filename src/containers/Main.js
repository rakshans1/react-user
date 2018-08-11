import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import Loadable from 'react-loadable';
import Loading from  '../components/Loading';

import { authDestroy } from '../actions/authActions';
import {authService} from '../services';
import Users from './Users';

const styles = (theme) => ({
  main: {
    height: '100%',
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 8}px 0`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 2}px`,
    }
  }
});


const LoadableHeader = Loadable({ // Example for component base splitting
  loader: () => import(/* webpackChunkName: "Header" */'../components/Header'),
  loading: () => null
});

const LoadableView = Loadable({ //Example of route based splitting
  loader: () => import(/* webpackChunkName: "View" */'./View'),
  loading: Loading
});

const LoadableEdit = Loadable({
  loader: () => import(/* webpackChunkName: "Edit" */'./Edit'),
  loading: Loading
});

const LoadableNew = Loadable({
  loader: () => import(/* webpackChunkName: "New" */'./New'),
  loading: Loading
});



export class Main extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  logout = () => {
    authService.logout();
    this.props.authDestroy();
  }

  render() {
    const { classes, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <LoadableHeader logout={this.logout} isAuthenticated={isAuthenticated}/>
        <main className={classes.main}>
          <Switch>
            <Route path="/new" component={LoadableNew} />
            <Route path="/user/:id" component={LoadableView} />
            <Route path="/edit/:id" component={LoadableEdit} />
            <Route path="/" exact component={Users} />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
  authDestroy
}


Main = withStyles(styles)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(Main);
