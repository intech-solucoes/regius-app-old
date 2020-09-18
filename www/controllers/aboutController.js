//About the app
regius.controller('aboutCtrl', function ($scope, $ionicModal) {
  // if (window.cordova) {
  //   cordova.getAppVersion(function (appVersion) {
  //     $scope.versao = appVersion;
  //   });
  // } else {
  $scope.versao = "1.16.3";
  //}

  $ionicModal.fromTemplateUrl('tos.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  })

  $scope.openModal = function () {
    $scope.modal.show();
  }

  $scope.closeModal = function () {
    $scope.modal.hide();
  }
});
