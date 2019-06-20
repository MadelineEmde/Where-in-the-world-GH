import React from 'react'
import Datamaps from 'datamaps'

const MAP_CLEARING_PROPS = ['height', 'scope', 'setProjection', 'width']

const propChangeRequiresMapClear = (oldProps, newProps) => {
  return MAP_CLEARING_PROPS.some(key => oldProps[key] !== newProps[key])
}

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.resizeMap = this.resizeMap.bind(this)
  }

  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener('resize', this.resizeMap)
    }
    this.drawMap()
  }

  componentWillReceiveProps(newProps) {
    if (propChangeRequiresMapClear(this.props, newProps)) {
      this.clear()
    }
  }

  componentDidUpdate() {
    this.drawMap()
  }

  componentWillUnmount() {
    this.clear()
    if (this.props.responsive) {
      window.removeEventListener('resize', this.resizeMap)
    }
  }

  clear() {
    delete this.map
  }

  drawMap() {
    let map = this.map
    if (!map) {
      map = this.map = new Datamaps({
        element: document.getElementById('container'),
        responsive: true
      })
    }
  }

  resizeMap() {
    this.map.resize()
  }

  render() {
    return <div id="container" />
  }
}
