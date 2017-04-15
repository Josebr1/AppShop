angular.module('app.controllers', [])

  .controller('allCategoriesController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

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

  .controller('detailIsPaymentController', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicHistory',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory) {

      $scope.finalizePayment = function () {
        $ionicPopup.alert({
          title: 'Pedido confirmado!',
          template: 'Daqui a pouco chega :)'
        }).then(function () {
          //$state.go('tabsController.home', {}, {reload: true});
          $ionicHistory.clearCache().then(function () {
            $state.go('tabsController.home', {}, {reload: true});
          });
        });
      };

    }])

  .controller('pedidoFinalizadoCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {


    }])

  .controller('productCategoryController', ['factoryService', '$scope', '$stateParams', '$ionicLoading',
    function (factoryService, $scope, $stateParams, $ionicLoading) {
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      var url = $stateParams.urlId;

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

  .controller('productDetailController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

    }])
