import React from 'react'
import $ from 'jquery'

export default class flotWeek extends React.Component {
  constructor (props) {
    console.log('constructeir')
    super(props)
    this.chartData = [
      [0, 4],
      [1, 6],
      [2, 3],
      [3, 8]
    ]
    this.chartOptions = {
      series: {
        bars: {
          show: true,
          barWidth: 0.3,
          align: 'center',
          lineWidth: 0,
          fill: 0.75
        }
      },
      xaxis: {
        ticks: [
            [0, 'First'],
            [1, 'Second'],
            [2, 'Third'],
            [3, 'Fourth']
        ],
        mode: 'categories',
        tickLength: 0
      },
      yaxis: {
        max: 10
      }
    }
  }

  // displayName = 'FlotChart'
  renderChart () {
    var chartDiv = this.refs.chartDiv
    var chartData = [this.chartData]
    var chartOptions = this.chartOptions
    $(chartDiv).width(300).height(200)
    $.plot(chartDiv, chartData, chartOptions)
  }
  componentWillReceiveProps (nextProps) {
    // called to see if the component is receiving props
  }

  shouldComponentUpdate (nextProps, nextState) {
    // called to ask whether the component should be updated
    return true
  }

  componentDidMount () {
    // called when the component is mounted
    this.renderChart()
  }

  componentDidUpdate () {
    // called after the props are updated
    this.renderChart()
  }

  render () {
    return React.DOM.div({
      className: 'flotChart',
      ref: 'chartDiv'
    })
  }
}
