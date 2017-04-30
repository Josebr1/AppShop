angular.module('app.controllers', ['ionic.cloud'])

  .controller('allCategoriesController', ['factoryService', '$scope', '$stateParams', '$ionicLoading',
    function (factoryService, $scope, $stateParams, $ionicLoading) {
      var url = "http://localhost:8080/appshop/rest/categoria";

      factoryService.lista(url).then(function (response) {
        $scope.categorias = response;
        console.log("OK");
      }, function (error) {
        console.log(error);
      }).finally(function () {
      })
    }])

  .controller('homeController', ['$scope', '$stateParams', '$ionicUser',
    function ($scope, $stateParams, $ionicUser) {

      $ionicUser.set('birthdate', '5/17/1985');

    }])

  .controller('profileController', ['$scope', '$stateParams', '$ionicUser',
    function ($scope, $stateParams, $ionicUser) {

      console.log($ionicUser.get('birthdate'));
    }])

  .controller('signInController', ['$scope', '$stateParams', '$ionicAuth',
    function ($scope, $stateParams, $ionicAuth) {

      $scope.data = {};

      $scope.signIn = function () {

        var details = {'email': $scope.data.email, 'password': $scope.data.password};

        $ionicAuth.login('basic', details).then(function () {
          console.log("Ok");
        }, function (err) {
          console.log("Erro" + err);
        })
      }

    }])

  .controller('signUpController', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser',
    function ($scope, $stateParams, $ionicAuth, $ionicUser) {


      $scope.data = {};

      $scope.signUp = function () {

        var details = {'name': $scope.data.name, 'email': $scope.data.email, 'password': $scope.data.password};

        console.log($scope.data.name);

        $ionicAuth.signup(details).then(function () {

          $ionicUser.details.name = $scope.data.name;
          $ionicUser.details.email = $scope.data.email;
          $ionicUser.details.password = $scope.data.password;

          $ionicUser.save();
          console.log("Ok");
        }, function (err) {
          console.log("Erro" + err);
        });

      };


    }])

  .controller('settingsController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

    }])

  .controller('searchByProductController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

    }])

  .controller('shoppingCartController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

    }])

  .controller('verifyZipCodeController', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicHistory',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      $scope.dados = {};


      $scope.verifyZipCode = function () {

        console.log($scope.dados.code);

        var service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix({

          origins: [$scope.dados.code],
          destinations: ["Etec da zona leste"],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC

        }, callback);
      };

      function callback(response, status) {
        var kmString = response.rows[0].elements[0].distance.text;
        var km = kmString.replace("km", "");

        console.log(km);

        if (status !== google.maps.DistanceMatrixStatus.OK) {
          console.log("Error");
        } else {
          if (parseInt(km) <= 10) {
            console.log("Ok");
            $ionicPopup.alert({
              title: "Distancia OK",
              template: 'Daqui a pouco chega :)'
            }).then(function () {
              //$state.go('tabsController.home', {}, {reload: true});
              $ionicHistory.clearCache().then(function () {
                $state.go('deliveryAddress', {"codeZip": $scope.dados.code}, {reload: true});
              });
            });
          } else {
            console.log("Não");
            $ionicPopup.alert({
              title: "Atenção",
              template: 'Infelizmente o endereço de entrega não se encontra no limite especificado :)'
            }).then(function () {
              //$state.go('tabsController.home', {}, {reload: true});
              $state.go('tabsController.home', {}, {reload: true});
            });
          }
        }
      }

    }])

  .controller('detailIsPaymentController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('productCategoryController', ['factoryService', '$scope', '$stateParams', '$ionicLoading',
    function (factoryService, $scope, $stateParams, $ionicLoading) {
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      var idCategoria = $stateParams.urlId;
      var url = "http://localhost:8080/appshop/rest/produto/categoria/" + idCategoria;
      $ionicLoading.show();

      console.log("HTTP");
      console.log(url);

      factoryService.lista(url).then(function (response) {
        $scope.produtos = response;
      }, function (error) {
        console.log(error);
      }).finally(function () {
        $ionicLoading.hide();
      })

    }])

  .controller('productDetailController', ['factoryService', '$scope', '$stateParams', '$ionicLoading',
    function (factoryService, $scope, $stateParams, $ionicLoading) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      var id = $stateParams.idProduto;
      var url = "http://localhost:8080/appshop/rest/produto/" + id;
      $ionicLoading.show();

      console.log("HTTP");
      console.log(url);

      factoryService.lista(url).then(function (response) {
        $scope.produto = response;
      }, function (error) {
        console.log(error);
      }).finally(function () {
        $ionicLoading.hide();
      })

    }])

  .controller('deliveryAddressController', ['factoryService', '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$state',
    function (factoryService, $scope, $stateParams, $ionicLoading, $ionicPopup, $ionicHistory, $state) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      var code = $stateParams.codeZip;
      var url = "https://viacep.com.br/ws/" + code + "/json/";

      $ionicLoading.show();

      console.log("HTTP");
      console.log(url);

      factoryService.lista(url).then(function (response) {
        $scope.infor = response;

        $scope.street = $scope.infor.logradouro;
        $scope.neighborhood = $scope.infor.bairro;
        $scope.code = $scope.infor.cep;

        console.log($scope.infor.logradouro);
      }, function (error) {
        console.log(error);
      }).finally(function () {
        $ionicLoading.hide();
      });

      $scope.finalizePayment = function () {
        console.log("finalizePayment");

        $ionicPopup.alert({
          title: "Pedido OK",
          template: 'Daqui a pouco chega :)'
        }).then(function () {
          //$state.go('tabsController.home', {}, {reload: true});
          $ionicHistory.clearCache().then(function () {
            $ionicHistory.clearHistory();
            $state.go('tabsController.home');

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });

          });
        });
      }

    }]);

