import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Main extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    return (
      <div>
        <h1>User List</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
