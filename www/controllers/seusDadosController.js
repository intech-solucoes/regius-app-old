regius.controller('seusDadosCtrl', function($scope, apiService) {
  console.log('controller', 'seusDadosCtrl');

  	// Retrieving user 
	var url = '/plan/:id/user/profile'.replace(':id', window.localStorage.plan_id);
	var method = 'get';

	apiService.listData($scope, url, method);
});