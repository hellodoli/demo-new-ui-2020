app.controller('homeController', function ($scope, $state) {
  $scope.$on('$stateChangeSuccess', function (event, toState) {
    document.addEventListener("keydown", myFunctionKey);
    var parents = ['home'];
    $scope.hideParent = parents.indexOf(toState.name) !== -1 ? false : true;
    if (!$scope.hideParent) {
      // TO DO
    }
  });
  
  function myFunctionKey(e) {
    switch(e.keyCode){
      case 13:
          $state.go('vod', { eventData: { data: 'demo Data Text' } });
          console.log('key press home');
          document.removeEventListener("keydown", myFunctionKey);
          break;
    }
  }
  $scope.welcome = 'Welcome Home!!!';
  $scope.goVODState = function () {
    $state.go('vod', { eventData: { data: 'demo Data Text' } });
  };
});