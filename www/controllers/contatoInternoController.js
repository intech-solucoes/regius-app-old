//Post contact form
regius.controller('contatoInternoCtrl', function ($scope, apiService, $ionicPopup) {
    
    var url = 'contact/interno';
    

    apiService.list(url, 'get', null, function (list) {
        console.debug(list[0].item_value);
        $scope.email = list[0].item_value;
    });

    // Preparing data for post
    $scope.sendMail = function () {
        var params = {};        
        for (var key in event.target.elements) {
            if (isFinite(Number(key))) {
                var element = event.target.elements[key];
                if (element.name)
                    params[element.name] = element.value;
            }
        }

        apiService.listData($scope, url, 'post', params, function (data) {            
            $scope.results = data;
            $ionicPopup.show({
                title: 'Obrigado!',
                subTitle: data.msg,
                buttons: [
                  { text: 'Ok' }
                ]
            });
        });
    };
});