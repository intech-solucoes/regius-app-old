regius.controller('seuFuturoPostCtrl', function($scope, apiService, $ionicPopup, $state, $stateParams) {
  if (!Object.keys($state.current.params).length) {
    // probably opened the app directly in the simulation page. Let's take a step back
    $state.go('your-future', {id: $stateParams.id});
  }

  $scope.$on('$ionicView.enter', function() {
    console.log('$state.current.params', $state.current.params);
    var url = 'plan/:id/your_future'.replace(':id', window.localStorage.plan_id);
    apiService.listData($scope, url, 'post', $state.current.params, function(data){
      console.log('data', data);

      $scope.results = data;
    });
  });
});