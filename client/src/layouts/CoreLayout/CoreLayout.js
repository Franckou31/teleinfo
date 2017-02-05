import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='row'>
    <Header />

    <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
      <h1 className='page-header'>Statistiques consommation</h1>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
