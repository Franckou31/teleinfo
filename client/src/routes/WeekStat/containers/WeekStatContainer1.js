import React from 'react'
import { formatWeekData } from '../../../services/teleinfoData.service'
import TeleInfoCache from '../../../services/cache.service'
import WeekGraph from './WeekGraph'

export default class WeekStat extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  initState (props) {
    this.nbDays = props.params.nbdays
    this.url = 'api/q7days?d=today&nbdays=' + this.nbDays
    this.state = { response: undefined }
  }

  constructor (props) {
    super(props)
    console.log('constructeur ' + props.params.nbdays)
    this.initState(props)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps entering' + nextProps.params.nbdays)
    this.initState(nextProps)
  }
  computeCacheKey () {
    let key = TeleInfoCache.type.STAT_SEVEN + this.nbDays
    return key
  }

  fetchData () {
    if (this.state.response !== undefined) {
      return
    }
    var vm = this
    console.log('fetchData entering' + this.nbDays)
    var url = this.url
    var key = this.computeCacheKey()
    var series = TeleInfoCache.get(key)

    if (series === undefined) {
      fetch(url).then(function (response) {
        if (response.ok) {
          response.json().then(function (json) {
            console.log('fetchData entering then2')
            const series = formatWeekData(json)
            vm.data = series
            TeleInfoCache.set(key, series)
            vm.setState({ response: 'OK' })
            console.log('fetchData ending then2')
          })
        } else {
          vm.setState({ response: 'KO' })
          console.log('Mauvaise réponse du réseau ' + response.status + '-' + response.statusText)
        }
      })
      .catch(function (error) {
        vm.setState({ response: 'KO' })
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
      })
    } else {
      vm.data = series
      vm.setState({ response: 'OK' })
    }

    console.log('fetchData ending')
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

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps, prevState) {
    this.fetchData()
  }
}
