import React from 'react'
import {connect} from 'react-redux'
import Datamaps from 'datamaps'
import {
  addTraveledAction,
  removeTraveledAction,
  findStartingCountryThunk,
  decreaseGuesses
} from '../store/map'
import Winner from './winner'
import Loser from './loser'

const MAP_CLEARING_PROPS = ['height', 'scope', 'setProjection', 'width']

const propChangeRequiresMapClear = (oldProps, newProps) => {
  return MAP_CLEARING_PROPS.some(key => oldProps[key] !== newProps[key])
}

class DisconnectedMap extends React.Component {
  constructor(props) {
    super(props)
    this.resizeMap = this.resizeMap.bind(this)
    this.drawMap = this.drawMap.bind(this)
    this.winnerFunc = this.winnerFunc.bind(this)
    this.loserFunc = this.loserFunc.bind(this)
    this.state = {
      winner: false,
      loser: false
    }
  }

  componentDidMount() {
    console.log('component did mount')
    if (this.props.responsive) {
      window.addEventListener('resize', this.resizeMap)
    }
    this.props.findStarting()
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
        ...this.props.data
      },
      done: datamap => {
        datamap.svg.selectAll('.datamaps-subunit').on('click', geography => {
          console.log(geography, 'clicked geography')
          let travel = this.props.data
          if (geography.id === this.props.target.countryId) {
            console.log('winnerfunc running')
            this.winnerFunc()
          } else if (travel[geography.id]) {
            //if a country has been selected before
            if (travel[geography.id].fillKey === 'filled') {
              // check if it is still selected
              //if so, remove selection
              this.props.removeTraveled(geography.id)
            } else {
              //if it's been selected before but currently not full, dispatch add selection
              this.props.addTraveled(geography)
            }
          } else {
            //if a country has never been selected, add selection
            this.props.addTraveled(geography)
            this.props.decreaseGuesses()
            if (this.props.remaingGuesses < 1) {
              this.loserFunc()
            }
          }
          travel = this.props.data
          this.map.updateChoropleth(travel)
        })
      }
    })
    // }
  }

  winnerFunc() {
    this.setState({winner: true})
  }
  loserFunc() {
    this.setState({loser: true})
  }
  resizeMap() {
    this.map.resize()
  }

  render() {
    return (
      <div>
        {this.state.winner === true ? <Winner /> : null}
        {this.state.loser === true ? <Loser /> : null}
        <div>Remaining guesses: {`${this.props.remaingGuesses}`}</div>
        <div>
          Explored:
          {this.props.guessed.join(', ')}
        </div>
        {/* <button onClick={() => <Hint> >HINT</button> */}
        <div id="container" />
      </div>
    )
  }
}

const mapState = state => ({
  data: state.map.data,
  guessed: state.map.guessed,
  target: state.map.target,
  remaingGuesses: state.map.remaingGuesses,
  user: state.user
})

const mapDispatch = dispatch => ({
  addTraveled: countryId => dispatch(addTraveledAction(countryId)),
  removeTraveled: countryId => dispatch(removeTraveledAction(countryId)),
  findStarting: () => dispatch(findStartingCountryThunk()),
  decreaseGuesses: () => dispatch(decreaseGuesses())
})

export default connect(mapState, mapDispatch)(DisconnectedMap)
