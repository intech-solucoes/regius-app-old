//window.api = 'http://localhost/RegiusApi/';
//window.api = 'http://localhost:8100/api/';       // proxy to avoid CORS on development
//window.api                  = 'http://201.45.185.170/RegiusApi/'; // $rootScope.API_URL for production
//window.api                  = 'http://10.10.170.11/RegiusApiDev/';
window.googleProjectNumber = '3350702910';
window.onesignalAppId = '223f278b-cce9-46ae-965c-1b8ebd11dfe9';

angular.module('app', ['ionic', 'ngFileUpload', 'ngCordova', 'ngSanitize', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

  .run(function ($ionicPlatform, $rootScope, $timeout, apiService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        StatusBar.overlaysWebView(false);
        //StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString('#a3a543');
      }

      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          alert("É necessário estar conectado a internet", "Desconectado");

          ionic.Platform.exitApp();
        }
      }

      cordova.getAppVersion(function (appVersion) {
        apiService.listData($rootScope, 'versao', 'get', {}, function (apiVersion) {
          console.log("Api version: " + apiVersion);
          console.log("App version: " + appVersion);

          appVersion = appVersion.split('.');
          apiVersion = apiVersion.split('.');

          if (appVersion[0] < apiVersion[0] ||
            appVersion[1] < apiVersion[1]) {
            alert("Esta versão do aplicativo está desatualizada! Para continuar, por favor, atualize o aplicativo da Regius.");
            ionic.Platform.exitApp();
          }
        });
      });

      console.debug(ionic.Platform.device());
    });

    $rootScope.API_URL = config.apiUrl //window.api; // $rootScope.API_URL for production

    document.addEventListener('deviceready', function () {
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function (jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      console.log('window.onesignalAppId', window.onesignalAppId);
      console.log('window.googleProjectNumber', window.googleProjectNumber);

      window.plugins.OneSignal.init(
        window.onesignalAppId,
        { googleProjectNumber: window.googleProjectNumber },
        notificationOpenedCallback
      );

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
    }, false);
  });
