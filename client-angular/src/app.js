import 'bootstrap/dist/css/bootstrap.css';
import './dashboard.css';
import './examples.css';
import './app.css';

/* For JQuery */
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = $;
window.jQuery = jQuery;
/* For JQuery */

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import home from './features/home';
import daystat from './features/daystat';
import weekstat from './features/weekstat';

require('jquery-flot');
require('jquery.flot.time');
require('jquery.flot.stack');
require('jquery.flot.resize');

angular.module('app', [uirouter, home, daystat, weekstat])
  .config(routing);
