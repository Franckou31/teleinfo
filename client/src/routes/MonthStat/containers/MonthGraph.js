import React from 'react'

import $ from 'jquery'

export default class MonthGraph extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }
  renderChart () {
    console.log('renderChart ')
    var chartDiv = this.refs.chartDiv
    // $(chartDiv).width(300).height(200)

    $.plot(chartDiv, this.chartData.statDays[0].data, this.chartData.options)
  }

  componentDidMount () {
    // called when the component is mounted
    console.log('componentDidMount')
    this.renderChart()
  }

  componentDidUpdate () {
    // called after the props are updated
    console.log('componentDidUpdate')
    this.renderChart()
  }

  render () {
    console.log('render')
    const data = this.props.data
    this.chartData = data

    return React.DOM.div({
      className: 'chart',
      ref: 'chartDiv'
    })
  }
}
