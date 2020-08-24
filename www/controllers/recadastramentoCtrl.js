regius
  .directive('customOnChange', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeHandler);
      }
    }
  })
  .controller('recadastramentoCtrl', function ($scope, $state, $ionicScrollDelegate, $ionicLoading, $ionicHistory, $rootScope, $ionicPopup, Upload, $cordovaCamera, $cordovaActionSheet, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaImagePicker, apiService) {
    $scope.passo = 0;
    $scope.totalPassos = 8;
    $scope.dados = {};
    $scope.oidSolicitacao = 0;
    $scope.files = [];

    var anexos = {};

    $scope.$on('$ionicView.enter', function (scope, states) {
      if (states.stateName == "recadastramento")
        $scope.init();
    });

    $scope.init = function () {
      $scope.passo = 0;

      var url = 'recadastramento/finalizado/' + window.localStorage.plan_id;;
      var method = 'get';

      apiService.listData($scope, url, method, null, function (data) {
        if (data != "") {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });

          $state.go('recadastramentoFinalizado', {}, { reload: true });
        } else {
          var passoArmazenado = localStorage.getItem('recadastramentoPasso');

          // tem que jogar para string pq as vezes essa bosta vem como string, as vezes como objeto
          if (passoArmazenado && passoArmazenado.toString() != 'null') {
            $scope.passo = parseInt(passoArmazenado);
            $scope.oidSolicitacao = parseInt(localStorage.getItem('recadastramentoSolicitacao'));
            buscarPasso();
          }
        }
      });
    }

    $scope.iniciar = function () {
      var url = 'recadastramento/formulario/' + window.localStorage.plan_id;
      var method = 'post';

      apiService.listData($scope, url, method, null, function (data) {
        $scope.passo = ++$scope.passo;
        $scope.oidSolicitacao = data;
        buscarPasso();
      });
    }

    function buscarPasso() {
      $ionicScrollDelegate.scrollTop();
      var url = 'plan/' + window.localStorage.plan_id + '/recadastramento/' + $scope.oidSolicitacao + '/passo/' + $scope.passo;
      var method = 'get';

      apiService.listData($scope, url, method, null, function (data, $scope) {
        $scope.recadastramento = data;
      });
    }

    $scope.voltar = function () {
      $scope.passo = --$scope.passo;

      if ($scope.passo > 0) {
        localStorage.setItem('recadastramentoSolicitacao', $scope.oidSolicitacao);
        localStorage.setItem('recadastramentoPasso', $scope.passo);

        buscarPasso();
      } else {
        localStorage.removeItem('recadastramentoSolicitacao');
        localStorage.removeItem('recadastramentoPasso');
      }
    }

    $scope.avancar = function () {
      if (validarCampos()) {
        if ($scope.passo == $scope.totalPassos) {
          var url = 'plan/' + window.localStorage.plan_id + '/recadastramento/' + $scope.oidSolicitacao + '/passo';
          var method = 'post';

          apiService.listData($scope, url, method, $scope.recadastramento, function (data) {
            url = 'plan/' + window.localStorage.plan_id + '/recadastramento/' + $scope.oidSolicitacao + '/finalizar';
            method = 'post';

            apiService.listData($scope, url, method, null, function (data) {
              $ionicHistory.nextViewOptions({
                disableBack: true
              });

              localStorage.removeItem('recadastramentoSolicitacao');
              localStorage.removeItem('recadastramentoPasso');
              $state.go('recadastramentoFinalizado', {}, { reload: true });
            });
          });
        } else {
          var url = 'plan/' + window.localStorage.plan_id + '/recadastramento/' + $scope.oidSolicitacao + '/passo';
          var method = 'post';

          // for(i = 0, count = $scope.recadastramento.GrupoCampos.length; i < count; i++) {
          //     var grupoCampos = $scope.recadastramento.GrupoCampos[i];

          //     for(i2 = 0, count2 = grupoCampos.Campos.length; i2 < count2; i2++) {
          //         var campo = grupoCampos.Campos[i2];
          //         campo.Valores = null;
          //     }
          // }

          // console.log(JSON.stringify($scope.recadastramento));

          apiService.listData($scope, url, method, $scope.recadastramento, function (data) {
            $scope.passo = ++$scope.passo;

            localStorage.setItem('recadastramentoSolicitacao', $scope.oidSolicitacao);
            localStorage.setItem('recadastramentoPasso', $scope.passo);

            buscarPasso();
          });
        }
      }
    }

    function validarCampos() {
      var camposValidos = true;

      for (i = 0, count = $scope.recadastramento.GrupoCampos.length; i < count; i++) {
        var grupoCampos = $scope.recadastramento.GrupoCampos[i];

        // grupo exige comprovação
        if (grupoCampos.ExigeComprovacao) {
          for (i2 = 0, count2 = grupoCampos.Campos.length; i2 < count2; i2++) {
            var campo = grupoCampos.Campos[i2];

            var valor = campo.TipoCampo == "TXT" || campo.TipoCampo == "EMA" ? campo.NovoValor : campo.NovoValorCombo;

            if (campo.ValorAntigo != valor && campo.Arquivo == null) {
              camposValidos = false;
            }
          }

          if (!camposValidos)
            $scope.showAlert('Erro', 'O grupo ' + grupoCampos.Titulo + ' foi alterado e necessita de comprovação.');
        } else {
          for (i2 = 0, count2 = grupoCampos.Campos.length; i2 < count2; i2++) {
            var campo = grupoCampos.Campos[i2];

            var valor = campo.TipoCampo == "TXT" || campo.TipoCampo == "EMA" ? campo.NovoValor : campo.NovoValorCombo;

            if (campo.ExigeComprovacao && campo.ValorAntigo != valor && campo.Arquivo == null) {
              camposValidos = false;
              $scope.showAlert('Erro', 'O campo ' + campo.Titulo + ' foi alterado e necessita de comprovação.');
            }
          }
        }
      }

      return camposValidos;
    }

    $scope.selecionarAnexo = function (campo, isGrupo) {
      var options = {
        title: 'Selecione uma imagem:',
        buttonLabels: ['Galeria', 'Usar Câmera'],
        addCancelButtonWithLabel: 'Cancelar',
        androidEnableCancelButton: true,
      };
      $cordovaActionSheet.show(options).then(function (btnIndex) {
        var type = null;
        if (btnIndex === 1) {
          type = Camera.PictureSourceType.PHOTOLIBRARY;
        } else if (btnIndex === 2) {
          type = Camera.PictureSourceType.CAMERA;
        }
        if (type !== null) {
          $scope.selectPicture(type, campo, isGrupo);
        }
      });
    };

    $scope.selectPicture = function (sourceType, campo, isGrupo) {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imagePath) {
        $ionicLoading.show({
          template: 'Carregando...'
        });

        // Grab the file name of the photo in the temporary directory
        var currentName = imagePath.replace(/^.*[\\\/]/, '');

        //Create a new name for the photo
        var d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";

        // If you are trying to load image from the gallery on Android we need special treatment!
        if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          window.FilePath.resolveNativePath(imagePath, function (entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function fail(e) {
              console.error('Error: ', e);
            }

            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              // Only copy because of access rights
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function (success) {
                $scope.image = newFileName;

                $scope.uploadImage(campo, isGrupo);
              }, function (error) {
                $scope.showAlert('Error', error.exception);
              });
            };
          });
        } else {
          var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          // Move the file to permanent storage
          $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            $scope.image = newFileName;

            $scope.uploadImage(campo, isGrupo);
          }, function (error) {
            $scope.showAlert('Error', error.exception);
          });
        }
      },
        function (err) {
          // Not always an error, maybe cancel was pressed...
        })
    };

    $scope.pathForImage = function (image) {
      if (image === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + image;
      }
    };

    $scope.uploadImage = function (campo, isGrupo) {
      // Destination URL
      var url = $rootScope.API_URL + 'recadastramento/upload/';

      // File for Upload
      var targetPath = $scope.pathForImage($scope.image);

      // File name only
      var filename = $scope.image;;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: { 'fileName': filename }
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
        $ionicLoading.hide();

        $scope.showAlert('Sucesso', 'Arquivo enviado com sucesso.');
        var retorno = JSON.parse(result.response);
        if (isGrupo) {
          for (i = 0, count = campo.Campos.length; i < count; i++) {
            campo.Campos[i].Arquivo = retorno.filename;
          }
          campo.ComprovacaoAnexada = true;
        } else {
          campo.Arquivo = retorno.filename;
          campo.ComprovacaoAnexada = true;
        }
      });
    }

    $scope.removerArquivo = function (campo, isGrupo) {
      if (isGrupo) {
        for (i = 0, count = campo.Campos.length; i < count; i++) {
          campo.Campos[i].Arquivo = null;
        }
        campo.ComprovacaoAnexada = false;
      } else {
        campo.Arquivo = false;
        campo.ComprovacaoAnexada = false;
      }
    }

    $scope.removerGrupo = function (campo) {
      for (i = 0, count = campo.Campos.length; i < count; i++) {
        campo.Campos[i].NovoValor = null;
        campo.Excluir = true;
      }
    }

    $scope.desfazerRemocao = function (campo) {
      for (i = 0, count = campo.Campos.length; i < count; i++) {
        campo.Campos[i].NovoValor = campo.Campos[i].ValorAntigo;
        campo.Excluir = false;
      }
    }

    $scope.showAlert = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
    }
  });
