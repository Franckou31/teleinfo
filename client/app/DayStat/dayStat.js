'use strict';

angular.module('myApp.dayStat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/dayStat/:date', {
      templateUrl: 'DayStat/dayStat.html',
      controller: 'DayStatCtrl'})
    .when('/dayStat', {
      templateUrl: 'DayStat/dayStat.html',
      controller: 'DayStatCtrl'});
}])

.directive('chart', [function() {
    return {
        restrict: 'E',
        scope: {
          series: '=info', click: '&'
        },
        link: function(scope, elem, attrs) {
          $.plot(elem, scope.series.statDays[0].data, scope.series.options);
		      elem.show();
          elem.bind('plotclick', function( event, pos, item ) {
            console.log('xxx');
            //var callback = scope.click();
            console.log(event, pos, item);
            //callback( item );
            scope.$apply();
          });
          elem.bind('plotselected', function( event, ranges ) {
            console.log([ event, ranges ]);
          });

        }
    };
}])

.controller('DayStatCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.plotclick = function( arg ) {
    console.log( arg.series );
    for ( var i = 0; i < $scope.series.length; ++i ) {
      if ( $scope.series[i].label === arg.series.label ) {
        $scope.series[i].show = false;
      }
    }
  };
  var date = $routeParams.date;
  var series = getStatFromCache(STAT_TODAY, date);

  if (series != undefined) {
    $scope.day1 = series;
    $scope.consos = series;
    $scope.ready = true;
  } else {
    var url = "q1?d=today";
    $scope.ready = false;
    $http.get(url)
      .then(function(response) {
        var series = formatData(response.data);
        setStatInCache(series, STAT_TODAY, date);
        $scope.day1 = series;
        $scope.consos = series;
        $scope.ready = true;
    });
  }
}]);
