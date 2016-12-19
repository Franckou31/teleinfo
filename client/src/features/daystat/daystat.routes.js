routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('daystat', {
      url: '/daystat/:date',
      template: require('./daystat.html'),
      controller: 'DayStatController',
      controllerAs: 'daystat'
    });
}
