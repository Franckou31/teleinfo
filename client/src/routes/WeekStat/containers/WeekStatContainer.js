import React from 'react'
import TeleInfoCache from '../../../services/cache.service'
import FetchComponent from '../../../components/Common/FetchComponent'
import { formatWeekData } from '../../../services/teleinfoData.service'
import WeekGraph from './WeekGraph'

export default class WeekStat extends FetchComponent {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  initState (props) {
    super.initState(props)
    this.nbDays = props.params.nbdays
    this.url = 'api/q7days?d=today&nbdays=' + this.nbDays
  }

  computeCacheKey () {
    let key = TeleInfoCache.type.STAT_SEVEN + this.nbDays
    return key
  }

  formatData (data) {
    return formatWeekData(data)
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
