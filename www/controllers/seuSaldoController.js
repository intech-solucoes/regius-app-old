regius.controller('seuSaldoCtrl', function($scope, $ionicPopup, apiService) {
  console.log('controller', 'seuSaldoCtrl');
  	// Retrieving data for "Seu Saldo"
	var url = 'plan/' + window.localStorage.plan_id + '/balance';
	var method = 'get';

	apiService.listData($scope, url, method);

	// This popup is for "Extrato detalhado" button, since the method is not implemented, the popup shows up
	$scope.popup = function() {
		$ionicPopup.show({
		    title: 'Ooops!',
		    subTitle: 'Serviço indisponível no momento. Por favor volte mais tarde!',
		    buttons: [
		      { text: 'Ok' }
		    ]
		});
	};
});