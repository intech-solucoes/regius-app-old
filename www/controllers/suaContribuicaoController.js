regius.controller('suaContribuicaoCtrl', function ($scope, apiService) {
  console.log('controller', 'suaContribuicaoCtrl');

  $scope.plano = window.localStorage.plan_id;

  // Retrieving data for "Sua contribuicao"
  var url = 'plan/' + window.localStorage.plan_id + '/contribution';
  var method = 'get';

  apiService.listData($scope, url, method, null, (data) => {
    console.log(data);
  });
});
