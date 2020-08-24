regius.controller('userCtrl', function($scope, apiService, $rootScope){
  console.log('controller', 'userCtrl');
	$rootScope.$on('userEvent', function(event, data){
		$scope.plan = data.Plan;
		$scope.plan_status = data.Status;
	});
});