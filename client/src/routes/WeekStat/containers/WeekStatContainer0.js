import React from 'react'
import { formatWeekData } from '../../../services/teleinfoData.service'
import TeleInfoCache from '../../../services/cache.service'
import WeekGraph from './WeekGraph'

export default class WeekStat extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    const nbDays = props.params.nbdays
    console.log('constructeur ' + nbDays)
    this.fetchData(nbDays)
  }

  fetchData (nbDays) {
    var vm = this
    this.state = { response: undefined }
    console.log('fetchData entering' + nbDays)
    var url = 'api/q7days?d=today&nbdays=' + nbDays
    var series = TeleInfoCache.getStatFromCache(TeleInfoCache.type.STAT_SEVEN, new Date(), nbDays)

    if (series === undefined) {
      fetch(url).then(function (response) {
        if (response.ok) {
          response.json().then(function (json) {
            console.log('fetchData entering then2')
            const series = formatWeekData(json)
            vm.data = series
            TeleInfoCache.setStatInCache(series, TeleInfoCache.type.STAT_SEVEN, new Date(), nbDays)
            vm.setState({ response: 'OK' })
            console.log('fetchData ending then2')
          })
        } else {
          console.log('Mauvaise réponse du réseau ' + response.status + '-' + response.statusText)
        }
      })
      .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
      })
    } else {
      vm.data = series
      vm.setState({ response: 'OK' })
    }

    console.log('fetchData ending')
  }

  componentWillReceiveProps (nextProps) {
    const nbDays = nextProps.params.nbdays
    console.log('componentWillReceiveProps entering' + nbDays)
    this.fetchData(nbDays)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate')
    // called to ask whether the component should be updated
    return true
  }

  render () {
    console.log('Week Stat render')
    if (this.state.response !== undefined) {
      console.log('Week Stat render 1')
      return (
        <div>
          <WeekGraph data={this.data} />
        </div>
      )
    } else {
      console.log('Week Stat render 2')
      return (
        <div>
          Loading data ...
        </div>
      )
    }
  }
}
