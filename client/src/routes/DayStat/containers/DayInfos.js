import React from 'react'
import DayIndex from './DayIndex'
import DayConso from './DayConso'

export default class DayInfos extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render () {
    console.log('render')

    return (
      <div>
        <DayIndex data={this.props.data} />
        <br />
        <DayConso data={this.props.data} />
        <br />
      </div>
    )
  }
}
