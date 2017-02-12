// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import flotdemo from './flotdemo'
import WeekStat from './WeekStat'
import DayStat from './DayStat'
import MonthStat from './MonthStat'
import Cloture from './Cloture'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    CounterRoute(store),
    MonthStat(store),
    WeekStat(store),
    DayStat(store),
    Cloture(store),
    flotdemo(store)
  ]
})

export default createRoutes
