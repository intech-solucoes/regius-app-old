regius.controller('homeCtrl', function($scope, $rootScope, $ionicPopup, $window, apiService, removeDiacritics) {
	$scope.$on('$ionicView.enter', function() {

		// Loading menu items
		var url = 'plan/' + window.localStorage.plan_id + '/home';
		var method = 'get';

		apiService.listData($scope, url, method, null, function(data, $scope){
			console.log('data', data);
		});
	});

	// Loading menu icons
	$scope.loadImage = function(title) {
		src = title.replace(' ','_') + '.png';

		final = removeDiacritics.replace(src);

		mount = 'img/icons/' + final;

		return mount;
	};

	// Cleaning up plan from $rootScope if the page is index
	$scope.erasePlan = function(data) {
		if(data == '/index') {
			$rootScope.$broadcast('userEvent', {
				Plan: '',
				Status: ''
			});
		}
	};
});