app.controller('vodController', function ($scope, $state, $stateParams) {
  $scope.$on('$stateChangeSuccess', function (event, toState) {
    var parents = ['vod'];
    document.addEventListener("keydown", myFunctionKey);
    $scope.hideParent = parents.indexOf(toState.name) !== -1 ? false : true;
    if (!$scope.hideParent) {
      console.log($stateParams);
    }
  });

  
  function myFunctionKey(e) {
    switch(e.keyCode){
      case 37:
          $state.go('home');
          console.log('key press vod');
          document.removeEventListener("keydown", myFunctionKey);
          break;
    }
  }
});