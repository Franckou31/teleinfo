import React from 'react'
import FetchComponent from '../../../components/Common/FetchComponent'
import { formatDayData } from '../../../services/teleinfoData.service'
import TeleInfoCache from '../../../services/cache.service'
import DayGraph from './DayGraph'
import DayIndex from './DayIndex'

export default class DayStat extends FetchComponent {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  initState (props) {
    super.initState(props)
    let date = props.params.date
    if (date === undefined || date.length === 0 || date === 'today') {
      date = new Date().getTime()
    }
    this.date = date
    this.url = 'api/q1?d=' + date
  }

  computeCacheKey () {
    let key = TeleInfoCache.type.STAT_DAY + this.date
    return key
  }

  formatData (data) {
    return formatDayData(data)
  }

  render () {
    console.log('Day Stat render')
    if (this.state.response !== undefined) {
      console.log('Day Stat render 1')
      return (
        <div>
          <DayIndex data={this.data} />
          <div className='row placeholders'>
            <div className='col-md-8'>
              <DayGraph data={this.data} />
            </div>
          </div>
        </div>
      )
    } else {
      console.log('Day Stat render 2')
      return (
        <div>
          Loading data ...
        </div>
      )
    }
  }
}
