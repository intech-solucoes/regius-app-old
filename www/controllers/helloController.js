regius.controller('helloCtrl', function($scope, apiService, $rootScope, $state) {
  console.log('controller', 'helloCtrl');


  // Then we`re ready to select plans
	$rootScope.selectPlan = function(data) {
		window.localStorage.plan_id = data.id;

    // We store the selected here, because we need this information to show up on header
		$rootScope.$broadcast('userEvent', {
			Plan: data.plan,
			Status: data.status
		});
	};


  //$ionicView.enter to avoid plans cache
  $scope.$on('$ionicView.enter', function() {

    // Cleaning up plan from $rootScope
    $rootScope.$broadcast('userEvent', {
      Plan: '',
      Status: ''
    });

    apiService.listData($scope, 'index', 'get', null, function(data){
      $scope.plans = data;

      $rootScope.url2plan = {};
      for(var plan in data) {
        if (data.menu_url)
          $rootScope.url2plan[data.menu_url] = plan;
      }

    });

    // If the logged user is able to access only one plan, then we redirect the user to the menu screen
      if($scope.plans && $scope.plans.length === 1) {
        $rootScope.selectPlan(data[0]);
        $state.go('home');
      }
  });
});
