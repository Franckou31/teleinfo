import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div className='col-sm-3 col-md-2 sidebar'>
    <ul className='nav nav-sidebar'>
      <li className='active'><a href='!/dayStat/today'>Stats Conso <span className='sr-only'>(current)</span></a></li>
      <li>
        <Link to='/daystat/today' activeClassName='route--active'>
        Aujourdhui
        </Link>
      </li>
      <li>
        <Link to='/weekstat/7' activeClassName='route--active'>
        7 derniers jours
        </Link>
      </li>
      <li>
        <Link to='/weekstat/30' activeClassName='route--active'>
        30 derniers jours
        </Link>
      </li>
      <li>
        <Link to='/monthstat/today' activeClassName='route--active'>
        Mois en cours
        </Link>
      </li>
      <li>
        <IndexLink to='/' activeClassName='route--active'>
        Home
        </IndexLink>
      </li>
      <li>
        <Link to='/counter' activeClassName='route--active'>
        Counter
        </Link>
      </li>
      <li>
        <Link to='/flotdemo' activeClassName='route--active'>
        Flot Demo
        </Link>
      </li>

    </ul>
  </div>
)

export default Header
