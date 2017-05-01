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

      $scope.dados = {};

      $scope.dados.nome = $ionicUser.details.name;
      $scope.dados.email = $ionicUser.details.email;

      console.log($ionicUser.details.name);
    }])

  .controller('signInController', ['$scope', '$stateParams', '$ionicAuth', '$ionicLoading', '$ionicHistory', '$state', '$ionicPopup',
    function ($scope, $stateParams, $ionicAuth, $ionicLoading, $ionicHistory, $state, $ionicPopup) {

      $scope.data = {};

      $scope.signIn = function () {
        $ionicLoading.show();

        var details = {'email': $scope.data.email, 'password': $scope.data.password};

        $ionicAuth.login('basic', details).then(function () {
          console.log("Ok");
          $ionicLoading.hide();

          // Gravando o usuario logado
          var storage = window.localStorage;
          storage.setItem("logado", true);

          $ionicHistory.clearCache().then(function () {
            $ionicHistory.clearHistory();
            $state.go('tabsController.home');

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });

          });

        }, function (err) {
          console.log("Erro" + err);
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Atenção',
            template: 'Email ou senha incorretos'
          });
        })
      }

    }])

  .controller('signUpController', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$ionicLoading', '$ionicHistory', '$state', '$ionicPopup',
    function ($scope, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, $state, $ionicPopup) {

      $scope.data = {};

      $scope.signUp = function () {

        $ionicLoading.show();

        var details = {'name': $scope.data.name, 'email': $scope.data.email, 'password': $scope.data.password};

        console.log($scope.data.name);

        $ionicAuth.signup(details).then(function () {

          $ionicLoading.hide();

          $ionicPopup.alert({
            title: 'Atenção',
            template: 'Usuário criado com sucesso!'
          });

          $ionicHistory.clearCache().then(function () {
            $ionicHistory.clearHistory();
            $state.go('signIn');

            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });

          });
          console.log("Ok");
        }, function (err) {
          console.log("Erro" + err);

          $ionicPopup.alert({
            title: 'Atenção',
            template: 'Erro na criação do usuário'
          });


          $ionicLoading.hide();
        });

      };


    }])

  .controller('settingsController', ['$scope', '$stateParams', '$ionicPopup', '$ionicAuth', '$ionicHistory', '$state',
    function ($scope, $stateParams, $ionicPopup, $ionicAuth, $ionicHistory, $state) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      // A confirm dialog
      $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Atenção',
          template: 'Deseja realmente sair?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            console.log('You are sure');
            $ionicAuth.logout();

            var storage = window.localStorage;
            storage.removeItem("logado");

            $ionicHistory.clearCache().then(function () {
              $ionicHistory.clearHistory();
              $state.go('signIn');

              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });

            });

          } else {
            console.log('You are not sure');
          }
        });
      };

    }])

  .controller('searchByProductController', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

    }])

  .controller('shoppingCartController', ['sharedCartService', '$scope', '$stateParams', '$state', '$ionicPopup',
    function (sharedCartService, $scope, $stateParams, $state, $ionicPopup) {

//onload event-- to set the values
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.cart = sharedCartService.cart;
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = parseFloat(sharedCartService.total_amount);
      });

      //remove function
      $scope.removeFromCart = function (c_id) {
        $scope.cart.drop(c_id);
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;

      };

      $scope.inc = function (c_id) {
        $scope.cart.increment(c_id);
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;
      };

      $scope.dec = function (c_id) {
        $scope.cart.decrement(c_id);
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;
      };

      $scope.verifyZipCode = function () {
        if ($scope.total_amount > 0 && $scope.total_qty > 0) {
          var pedido = "";
          for (var i = 0, len = $scope.cart.length; i < len; i++) {
            console.log($scope.cart[i].cart_item_id);
            pedido += "Produto: " + $scope.cart[i].cart_item_name + " Descrição: " + $scope.cart[i].cart_item_desc + " Quantidade: " + $scope.cart[i].cart_item_qty + "\n";
          }
          console.log(pedido);
          console.log($scope.total_amount);

          // Gravando o pedido do usuario logado
          var storage = window.localStorage;
          storage.setItem("pedido", pedido);
          storage.setItem("valorPeido", $scope.total_amount);
          $state.go('verifyZipCode');
        }
        else {
          var alertPopup = $ionicPopup.alert({
            title: 'No item in your Cart',
            template: 'Please add Some Items!'
          });
        }
      };

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

  .controller('productDetailController', ['sharedCartService', 'factoryService', '$scope', '$stateParams', '$ionicLoading',
    function (sharedCartService, factoryService, $scope, $stateParams, $ionicLoading) {

      //put cart after menu
      var cart = sharedCartService.cart;

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      var id = $stateParams.idProduto;
      var url = "http://localhost:8080/appshop/rest/produto/" + id;
      $ionicLoading.show();

      console.log(cart);

      console.log("HTTP");
      console.log(url);

      factoryService.lista(url).then(function (response) {
        $scope.produto = response;
      }, function (error) {
        console.log(error);
      }).finally(function () {
        $ionicLoading.hide();
      });

      /* =============================== */

//add to cart function
      $scope.addToCart = function (id, image, name, desc, price) {
        cart.add(id, image, name, desc, price, 1);
      };

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

