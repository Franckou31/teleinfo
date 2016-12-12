'use strict';

angular.module('myApp.weekStat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weekStat', {
    templateUrl: 'WeekStat/weekStat.html',
    controller: 'WeekStatCtrl'
  });
}])

.controller('WeekStatCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.readyw = false;
  var date = $routeParams.date;
  var series = getStatFromCache(STAT_SEVEN, date);

  if (series != undefined) {
    $scope.dayw = series;
    $scope.readyw = true;
  } else {
    var url = "q7days?d=today";
    $http.get(url)
      .then(function(response) {
        var series = formatWeekData(response.data, new Date(), 6);
        setStatInCache(series, STAT_SEVEN, date);
        $scope.dayw = series;
        $scope.readyw = true;
    });
  }
}]);
