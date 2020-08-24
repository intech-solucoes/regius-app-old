angular.module('app.services', [], function ($httpProvider) {
    /* Transforming request to avoid potentially CORS issues */
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})

/* Specific service for login */
.service('apiServiceLogin', function ($http, $rootScope, $ionicPopup, $location, $state, apiService, $ionicLoading) {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    this.signin = function ($scope, url, params) {

        $ionicLoading.show({
            template: 'Aguarde...'
        });

        console.log('signin params', params);
        $http
            .post($rootScope.API_URL + url, params)
            .success(function (data) {
                console.log('params', params);
                window.localStorage.token = data.access_token;
                window.localStorage.username = params.username;
                window.localStorage.company = params.company;

                apiService.listData($scope, 'user/profile', 'get', null, function (data, $scope) {
                    $rootScope.user = data[0].item_value;
                });

                if(window.plugins) {
                    window.plugins.OneSignal.getIds((ids) => {
                        console.log("Subscribed");
                        
                        apiService.listData($scope, 'user/updateDevice/' + ids.userId, 'post', null, function(data, $scope) {
                            $ionicLoading.hide();
                            $state.go('index');
                        });
                    });
                } else {
                    $state.go('index');
                }
                
            }).error(function () {
                $ionicLoading.hide();
                $ionicPopup.show({
                    title: 'Dados inválidos',
                    subTitle: 'Tente novamente',
                    buttons: [{ text: 'Ok' }]
                });
            });
    };
})

/* This service works as the app kernel, every request is made here (for login, see apiServiceLogin above), it returns the requested data [$scope.list]*/
.service('apiService', function ($http, $rootScope, $ionicPopup, $ionicLoading) {
    //params = [], only used for post requests
    this.listData = function ($scope, url, method, params, callback) {
        if (typeof window.localStorage.token != 'undefined') {
            //Every request here must use this token. We have only two requests that didn`t use this
            //here they are: auth/companies and auth/login
            //The method auth/login returns the token bearer
            $http.defaults.headers.common.Authorization = 'bearer ' + window.localStorage.token;
        }
        
        $ionicLoading.show({
            template: 'Aguarde...'
        });

        // For get requests
        if (method == 'get') {
            $http.get($rootScope.API_URL + url)
                .success(function (data) {
                    $scope.list = data;

                    if (callback) {
                        callback($scope.list, $scope);
                    }

                    $ionicLoading.hide();

                }).error(function (data) {
                    $ionicLoading.hide();

                    // In case anything goes wrong a popup shows up
                    $ionicPopup.show({
                        title: 'Ooops!',
                        subTitle: data.message,
                        buttons: [
                            { text: 'Ok' }
                        ]
                    });
                });
        } else {
            // For post requests
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            //$http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

            $http.post($rootScope.API_URL + url, params)
            .success(function (data) {
                $scope.list = data;
                if (url == 'contact') {
                    $ionicPopup.show({
                        title: 'Obrigado!',
                        subTitle: data.msg,
                        buttons: [
                        { text: 'Ok' }
                        ]
                    });
                }

                if (callback) {
                    callback($scope.list, $scope);
                }
                $ionicLoading.hide();
            }).error(function (data) {
                $ionicLoading.hide();
                // In case anything goes wrong a popup shows up
                $ionicPopup.show({
                    title: 'Ooops!',
                    subTitle: data.message,
                    buttons: [
                    { text: 'Ok' }
                    ]
                });
            });
        }
    };

    this.list = function (url, method, params, callback) {
        if (typeof window.localStorage.token != 'undefined') {
            //Every request here must use this token. We have only two requests that didn`t use this
            //here they are: auth/companies and auth/login
            //The method auth/login returns the token bearer
            $http.defaults.headers.common.Authorization = 'bearer ' + window.localStorage.token;
        }

        $ionicLoading.show({
            template: 'Aguarde...'
        });

        // For get requests
        if (method == 'get') {
            $http.get($rootScope.API_URL + url)
                .success(function (data) {
                    if (callback)
                        callback(data);

                    $ionicLoading.hide();

                }).error(function (data) {
                    $ionicLoading.hide();

                    // In case anything goes wrong a popup shows up
                    $ionicPopup.show({
                        title: 'Ooops!',
                        subTitle: data.message,
                        buttons: [{ text: 'Ok' }]
                    });
                });
        } else {
            // For post requests
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

            $http.post($rootScope.API_URL + url, params)
            .success(function (data) {
                if (url == 'contact') {
                    $ionicPopup.show({
                        title: 'Obrigado!',
                        subTitle: data.msg,
                        buttons: [{ text: 'Ok' }]
                    });
                }
                
                if (callback)
                    callback(data);
                
                $ionicLoading.hide();
            })
            .error(function (data) {
                $ionicLoading.hide();
                // In case anything goes wrong a popup shows up
                $ionicPopup.show({
                    title: 'Ooops!',
                    subTitle: data.message,
                    buttons: [{ text: 'Ok' }]
                });
            });
        }
    };
});