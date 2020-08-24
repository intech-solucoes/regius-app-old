regius.controller('emprestimoFimCtrl', function ($scope, $state, $stateParams, $ionicHistory, $ionicPlatform) {
    $scope.numeroContrato = $stateParams.numeroContrato;

    $ionicPlatform.registerBackButtonAction(function (event) {
        event.preventDefault();
    }, 100);

    $scope.inicio = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.go('home');
    }
});