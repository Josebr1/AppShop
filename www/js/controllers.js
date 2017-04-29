angular.module('app.controllers', [])

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

  .controller('homeController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('profileController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('signInController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('signUpController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


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

  .controller('deliveryAddressController', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicHistory',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory) {

      $scope.dados = {};


      $scope.finalizePayment = function() {
        var service = new google.maps.DistanceMatrixService();

          service.getDistanceMatrix({

          origins: [$scope.dados.street + " " + $scope.dados.neighborhood],
          destinations: ["Etec da zona leste"],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC

        }, callback);
      };

      function callback(response, status) {
        var kmString = response.rows[0].elements[0].distance.text;
        var km = kmString.replace("km", "");

        console.log(km);

        if(status !== google.maps.DistanceMatrixStatus.OK){
          console.log("Error");
        }else{
          if(parseInt(km) <= 10){
            console.log("Ok");
            $ionicPopup.alert({
              title: "Distancia OK",
              template: 'Daqui a pouco chega :)'
            }).then(function () {
              //$state.go('tabsController.home', {}, {reload: true});
              $ionicHistory.clearCache().then(function () {
                $state.go('detailIsPayment', {}, {reload: true});
              });
            });
          }else{
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

    }]);
