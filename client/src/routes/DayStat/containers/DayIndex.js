import React from 'react'
import { Link } from 'react-router'
import Util from '../../../services/util.service'

export default class DayIndex extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render () {
    console.log('render')
    var infogenerale = this.props.data.infogenerale
    var consos = this.props.data.statDays[0].consos
    var index = infogenerale.index
    var prevDayLink = '/daystat/' + infogenerale.prevday
    // &nbsp;&nbsp;&nbsp;<a className='btn btn-default' href={prevDayLink} role='button'>

    return (
      <div>
        <div className='panel panel-success'>
          <div className='panel-heading'>
            <h4 className='panel-title'>Relevé index: { Util.formatDayDate(infogenerale.date) }
              &nbsp;&nbsp;&nbsp;<Link className='btn btn-default' to={prevDayLink} activeClassName='route--active'>
                { '<< Jour précédent' }
              </Link>
              <br /><br />
              Couleur du jour : { }
              <span className='label label-primary'>{ infogenerale.couleurDuJour }</span>
              { } - { } Couleur Demain : { }
              <span className='label label-primary'>{ infogenerale.couleurDemain }</span>
            </h4>
          </div>
          <div className='panel-body'>
            <div className='row'>
              { index.map((value) => {
                return (
                  <div className='col-md-2 col-sm-4 col-xs-6'>
                    <span className='Bidule'>index { value.label } : { value.valeur / 1000 } KW.</span>
                  </div>)
              })}
            </div>
          </div>
        </div>
        <br />
        <div className='panel panel-success'>
          <div className='panel-heading'>
            <h4 className='panel-title'><span>Consommation du jour</span></h4>
          </div>
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
