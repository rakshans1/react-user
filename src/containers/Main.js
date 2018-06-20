import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import Header from '../components/Header';
import Table from '../components/Table';

const styles = (theme) => ({
  main: {
    height: '100%',
    marginTop: '64px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '48px',
    }
  }
});

export class Main extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Header/>
        <main className={classes.main}>
          <Table/>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

Main = withStyles(styles, {name: 'Cart'})(Main);
export default connect(mapStateToProps, mapDispatchToProps)(Main);
