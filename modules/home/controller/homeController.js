app.controller('homeController', function ($scope, $state) {
  $scope.$on('$stateChangeSuccess', function (event, toState) {
    var parents = ['home'];
    $scope.hideParent = parents.indexOf(toState.name) !== -1 ? false : true;
    if (!$scope.hideParent) {
      // TO DO
    }
  });

  $scope.welcome = 'Welcome Home!!!';
  $scope.goVODState = function () {
    $state.go('vod', { eventData: { data: 'demo Data Text' } });
  };
});