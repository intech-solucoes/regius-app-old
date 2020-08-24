regius.controller('seuFuturoCtrl', function ($scope, $rootScope, apiService, $state, $ionicPopup) {
  console.log('controller', 'seuFuturoCtrl');

	var url = 'plan/' + window.localStorage.plan_id + '/your_future';
	var method = 'get';

  // Retrieving data for "Seu futuro"
	apiService.listData($scope, url, method, null, function(data) {

		$scope.list = [];
    $scope.name2data = {};

    for(x = 0; x < data.length; x++) {
      $scope.name2data[data[x].name] = data[x];
      data[x].model = Number(data[x].value); // right now, every your_future input is a number

      $scope.list[x] = data[x];
      $scope.list[x].type = typeof data[x].value;
    }

	});

  // Business for "Seu futuro"
  $scope.yourFutureFieldChange = function (a, b, c) {
    if (this.data.name == 'contribution') {
      $scope.name2data.compensation.model = Number(
        (event.target.value >= $scope.name2data.compensation.max)?
          $scope.name2data.compensation.max:
          event.target.value
      );
    }
  };

    // Preparing data for post
  $scope.postYourFuture = function () {
      var params = {};
      var naoExisteErro = true;
      var mensagemErro = "";
      
      for (var key in event.target.elements) {
          if (isFinite(Number(key))) {
              var element = event.target.elements[key];

              //No plano 01 Não há necessidade de validação.
              if (window.localStorage.plan_id != 1) {

                  if (!element.validity.valid) {
                      naoExisteErro = false;
                      mensagemErro = element.validationMessage;
                  }
              }

              if (element.name)
                  params[element.name] = element.value;
          }
      }

      if (naoExisteErro) {
          $state.get('your-future-post').params = params;
          $state.go('your-future-post', { id: window.localStorage.plan_id, x: 2 }); // Posting data
      }
      else {
          $ionicPopup.show({
              title: 'Ooops!',
              subTitle: mensagemErro,
              buttons: [
                { text: 'Ok' }
              ]
          });
      }
  };
});