import './daystat.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './daystat.routes';
import DayStatController from './daystat.controller';
import teleinfoData from '../../services/teleinfoData.service';
import chart  from '../../directives/chart.directive';

export default angular.module('app.daystat', [uirouter, chart, teleinfoData])
  .config(routing)
  .controller('DayStatController', DayStatController)
  .name;
