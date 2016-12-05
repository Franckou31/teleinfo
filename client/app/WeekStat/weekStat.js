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
  console.log('param!!! --' + date + '--');
  var url = "testdata7.json";

  //if (date != undefined && date =='today')
  url = "q7days?d=today";
  $http.get(url)
    .then(function(response) {
      var series = formatWeekData(response.data, new Date(), 6);
      $scope.dayw = series;
      $scope.readyw = true;
  });
}]);
