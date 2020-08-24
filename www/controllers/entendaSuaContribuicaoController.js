regius.controller('entendaSuaContribuicaoCtrl', function($scope, apiService) {
  console.log('controller', 'entendaSuaContribuicaoCtrl');

	var url = 'plan/' + window.localStorage.plan_id + '/contribution/details';
	var method = 'get';

	apiService.listData($scope, url, method);
});