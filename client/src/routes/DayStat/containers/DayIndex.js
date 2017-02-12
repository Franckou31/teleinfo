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
    var index = infogenerale.index
    var prevDayLink = '/daystat/' + infogenerale.prevday
    var nextDayLink = '/daystat/' + infogenerale.nextday

    var linkNextDayLink

    if (infogenerale.today === false) {
      linkNextDayLink = (
        <Link className='btn btn-default' to={nextDayLink} activeClassName='route--active'>
          { 'Jour suivant >>' }
        </Link>
      )
    }
    return (
      <div className='panel panel-success'>
        <div className='panel-heading'>
          <h4 className='panel-title'>Relevé index: { Util.formatDayDate(infogenerale.date) }
            &nbsp;&nbsp;&nbsp;<Link className='btn btn-default' to={prevDayLink} activeClassName='route--active'>
              { '<< Jour précédent' }
            </Link>
            {linkNextDayLink}
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
    )
  }
}
