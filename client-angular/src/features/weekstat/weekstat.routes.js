routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('weekstat', {
      url: '/weekstat/:nbdays',
      template: require('./weekstat.html'),
      controller: 'WeekStatController',
      controllerAs: 'weekstat'
    });
}
