import angular from 'angular';

function chart() {
  return {
    restrict: 'E',
    scope: {
      series: '=info', click: '&',
    },
    link(scope, elem) {
      // console.log('chart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      $.plot(elem, scope.series.statDays[0].data, scope.series.options);
      $(elem).show();
    },
  };
}

export default angular.module('directives.chart', [])
  .directive('chart', chart)
  .name;
