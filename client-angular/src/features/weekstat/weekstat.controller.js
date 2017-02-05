export default class WeekStatController {
  constructor($scope, $http, $stateParams, teleinfoData, teleinfoCache) {
    var vm = this;
    console.log("!!! constructor WeekStatController " + $stateParams.date);
    var nbdays = $stateParams.nbdays;
    var date = $stateParams.date;

    var series = teleinfoCache.getStatFromCache(teleinfoCache.type.STAT_SEVEN, date, nbdays);

    if (series != undefined) {
      $scope.dayw = series;
      vm.readyw = true;
    } else {
      var url = "api/q7days?d=today&nbdays=" + nbdays;
      vm.readyw = false;
      $http.get(url)
        .then(function(response) {
          var series = teleinfoData.formatWeekData(response.data, new Date(), 6);
          teleinfoCache.setStatInCache(series, teleinfoCache.type.STAT_SEVEN, date, nbdays);
          $scope.dayw = series;
          vm.readyw = true;
      }, function(response) {
        var x = response;
      });
    }
  }
}

WeekStatController.$inject = ['$scope', '$http', '$stateParams', 'teleinfoData', 'teleinfoCache'];
