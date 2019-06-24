import {clearAction} from '../store/map'
import React from 'react'
import {connect} from 'react-redux'

class Loser extends React.Component {
  render() {
    return (
      <div>
        <div className="box" />
        <div id="popup1" className="overlay">
          <div className="popup">
            <a className="close" href="#popup1">
              onClick={() => this.props.clear()}
              Start Over ×
            </a>
            <div className="content">YOU LOSE!!</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  clear: () => dispatch(clearAction())
})

export default connect(null, mapDispatch)(Loser)
