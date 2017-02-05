import './weekstat.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './weekstat.routes';
import WeekStatController from './weekstat.controller';
import teleinfoData from '../../services/teleinfoData.service';
import teleinfoCache from '../../services/cache.service';
import chart  from '../../directives/chart.directive';

export default angular.module('app.weekstat', [uirouter, chart, teleinfoData, teleinfoCache])
  .config(routing)
  .controller('WeekStatController', WeekStatController)
  .name;
