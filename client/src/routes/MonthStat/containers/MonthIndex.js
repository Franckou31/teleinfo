import React from 'react'
import { Link } from 'react-router'
import Util from '../../../services/util.service'

export default class MonthIndex extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render () {
    console.log('render')
    var infogenerale = this.props.data.infogenerale
    var consos = this.props.data.statDays[0].consos
    // begin compute month
    var ddTmp = new Date(infogenerale.date)
    var year = ddTmp.getFullYear()
    var month = ddTmp.getMonth() + 1
    var currentDate = year + '-' + String('0' + month).slice(-2)
    var dd = new Date()
    var todayYear = dd.getFullYear()
    var todayMonth = dd.getMonth() + 1
    var todayDate = todayYear + '-' + String('0' + todayMonth).slice(-2)

    var prevMonth = month
    var nextMonth = month
    var prevYear = year
    var nextYear = year
    if (month === 1) {
      prevMonth = 12
      prevYear -= 1
      nextMonth += 1
    } else if (month === 12) {
      prevMonth -= 1
      nextMonth = 1
      nextYear += 1
    } else {
      prevMonth -= 1
      nextMonth += 1
    }
    var prevDate = prevYear + '-' + String('0' + prevMonth).slice(-2)
    var nextDate = nextYear + '-' + String('0' + nextMonth).slice(-2)

    // end compute month
    var prevMonthLink = '/monthstat/' + prevDate
    var nextMonthLink

    if (currentDate !== todayDate) {
      nextMonthLink = '/monthstat/' + nextDate
    }

    return (
      <div>
        <div className='panel panel-success'>
          <div className='panel-heading'>
            <h4 className='panel-title'>Consommation: { Util.formatMonthDate(infogenerale.date) }
              &nbsp;&nbsp;&nbsp;<Link className='btn btn-default' to={prevMonthLink} activeClassName='route--active'>
                { '<< Mois précédent' }
              </Link>
              &nbsp;&nbsp;&nbsp;<Link className='btn btn-default' to={nextMonthLink} activeClassName='route--active'>
                { 'Mois suivant >>' }
              </Link>
            </h4>
          </div>
        </div>
        <div className='panel panel-success'>
          <div className='panel-body'>
            <div className='row'>
              { consos.filter(conso => conso.cout > 0).map(conso => {
                return (
                  <div className='col-md-2 col-sm-4 col-xs-6'>
                    <span className='Bidule'>{ conso.label } : { conso.conso / 1000 } kW.</span>
                    <div><h4><span>{ (conso.cout / 1000).toFixed(2) } €</span></h4></div>
                  </div>)
              })}
              <div className='col-md-2'>
                <h2><span className='label label-primary'>{ this.props.data.coutTotal } €</span></h2>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    )
  }
}
