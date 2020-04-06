app.config(['$stateProvider', '$urlRouterProvider', function config($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: 'home',
    url: '/home',
    views: {
      '': {
        templateUrl: './modules/home/view/home.html'
      }
    }
  }

  var vodState = {
    name: 'vod',
    url: '/vod',
    views: {
      'list@home': {
        templateUrl: './modules/vod/view/vod.html'
      }
    },       
    parent: homeState,
    params:{ 
      eventData: {}
    }
  }
  
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state(homeState)
    .state(vodState)
}]);