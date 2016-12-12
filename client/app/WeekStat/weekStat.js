'use strict';

angular.module('myApp.weekStat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weekStat/:nbdays', {
    templateUrl: 'WeekStat/weekStat.html',
    controller: 'WeekStatCtrl'
  });
}])

.controller('WeekStatCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.readyw = false;
  var date = $routeParams.date;
  var nbdays = $routeParams.nbdays;
  console.log("nbdays: " + nbdays);

  var series = getStatFromCache(STAT_SEVEN, date, nbdays);

  if (series != undefined) {
    $scope.dayw = series;
    $scope.readyw = true;
  } else {
    var url = "q7days?d=today&nbdays=" + nbdays;
    $http.get(url)
      .then(function(response) {
        var series = formatWeekData(response.data, new Date(), 6);
        setStatInCache(series, STAT_SEVEN, date, nbdays);
        $scope.dayw = series;
        $scope.readyw = true;
    });
  }
}]);
