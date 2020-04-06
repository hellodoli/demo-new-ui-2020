app.controller('vodController', function ($scope, $state, $stateParams) {
  $scope.$on('$stateChangeSuccess', function (event, toState) {
    var parents = ['vod'];
    $scope.hideParent = parents.indexOf(toState.name) !== -1 ? false : true;
    if (!$scope.hideParent) {
      console.log($stateParams);
    }
  });
});