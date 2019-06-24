import {clearAction} from '../store/map'
import React from 'react'
import {connect} from 'react-redux'

class Winner extends React.Component {
  render() {
    return (
      <div>
        <div className="box" />
        <div id="popup1" className="overlay">
          <div className="popup">
            <a
              className="close"
              href="#popup1"
              onClick={() => console.log(this.props)}
            >
              ×
            </a>
            <div className="content">YOU WON!!</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  clear: () => dispatch(clearAction())
})

export default connect(mapDispatch)(Winner)
