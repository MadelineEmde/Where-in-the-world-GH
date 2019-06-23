import React from 'react'
import {connect} from 'react-redux'
import Datamaps from 'datamaps'
import {addTraveledAction, removeTraveledAction} from '../store/map'

const MAP_CLEARING_PROPS = ['height', 'scope', 'setProjection', 'width']

const propChangeRequiresMapClear = (oldProps, newProps) => {
  return MAP_CLEARING_PROPS.some(key => oldProps[key] !== newProps[key])
}

class DisconnectedMap extends React.Component {
  constructor(props) {
    super(props)
    this.resizeMap = this.resizeMap.bind(this)
    this.drawMap = this.drawMap.bind(this)
  }

  componentDidMount() {
    console.log('component did mount')
    if (this.props.responsive) {
      window.addEventListener('resize', this.resizeMap)
    }
    this.drawMap()
  }

  drawMap() {
    console.log('running (!map)', 'this.props.traveled', this.props.traveled)
    this.map = new Datamaps({
      element: document.getElementById('container'),
      responsive: true,
      fills: {
        filled: '#5b7992',
        defaultFill: '#000000'
      },
      data: {
        ...this.props.traveled
      },
      done: datamap => {
        datamap.svg.selectAll('.datamaps-subunit').on('click', geography => {
          let travel = this.props.traveled
          if (travel[geography.id]) {
            if (travel[geography.id].fillKey === 'filled') {
              this.props.removeTraveled(geography.id)
            } else {
              this.props.addTraveled(geography.id)
            }
          } else {
            this.props.addTraveled(geography.id)
          }
          travel = this.props.traveled
          this.map.updateChoropleth(travel)
        })
      }
    })
    // }
  }

  resizeMap() {
    this.map.resize()
  }

  render() {
    return <div id="container" />
  }
}

const mapState = state => ({
  traveled: state.map.data,
  user: state.user
})

const mapDispatch = dispatch => ({
  addTraveled: countryId => dispatch(addTraveledAction(countryId)),
  removeTraveled: countryId => dispatch(removeTraveledAction(countryId))
})

export default connect(mapState, mapDispatch)(DisconnectedMap)
