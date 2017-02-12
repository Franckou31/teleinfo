import React from 'react'

export default class DayConso extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render () {
    console.log('render')
    var consos = this.props.data.statDays[0].consos

    return (
      <div>
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
      </div>
    )
  }
}
