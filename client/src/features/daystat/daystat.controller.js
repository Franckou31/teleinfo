export default class DayStatController {
  constructor($scope, $http, $stateParams, teleinfoData) {
    var vm = this;
    console.log("!!! constructor DayStatController " + $stateParams.date);
    // By default, set the date to today
    var date = $stateParams.date;
    if (date == undefined || date.length == 0 || date == "today") {
      date = new Date().getTime();
    }

    var url = "api/q1?d=" + date;
    // var url = "dataday.json";
    vm.ready = false;
    $http.get(url)
      .then(function(response) {

        var processor = teleinfoData;
        var series = teleinfoData.formatDayData(response.data);
        // we use $scope to set data in order they are available in the 'link'
        // functio,n of the 'chart' directive'.
        $scope.day1 = series;
        vm.stats = series;
        vm.ready = true;
    }, function(response) {
      var x = response;
    });
  }
}

DayStatController.$inject = ['$scope', '$http', '$stateParams', 'teleinfoData'];
