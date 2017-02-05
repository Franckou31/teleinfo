import React from 'react'
import FetchComponent from '../../../components/Common/FetchComponent'
import { formatWeekData } from '../../../services/teleinfoData.service'
import TeleInfoCache from '../../../services/cache.service'
import MonthGraph from './MonthGraph'
import MonthIndex from './MonthIndex'

export default class MonthStat extends FetchComponent {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  initState (props) {
    super.initState(props)
    let date = props.params.date
    // date must be:
    // - 'today' or a month like
    // - '2017-02'  (for february 2017)
    if (date === undefined || date.length === 0 || date === 'today') {
      var dd = new Date()
      var year = dd.getFullYear()
      var month = dd.getMonth() + 1
      date = year + '-' + String('0' + month).slice(-2)
    }
    this.date = date
    this.url = 'api/month?d=' + date
  }

  computeCacheKey () {
    let key = TeleInfoCache.type.STAT_MONTH + this.date
    return key
  }

  formatData (data) {
    return formatWeekData(data)
  }

//           <MonthIndex data={this.data} />

  render () {
    console.log('render')
    if (this.state.response !== undefined) {
      console.log('render 1')
      return (
        <div>
          <MonthIndex data={this.data} />
          <div className='row placeholders'>
            <div className='col-md-8'>
              <MonthGraph data={this.data} />
            </div>
          </div>
        </div>
      )
    } else {
      console.log('render 2')
      return (
        <div>
          Loading data ...
        </div>
      )
    }
  }
}
