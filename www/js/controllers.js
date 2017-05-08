angular.module('app.controllers', ['ionic.cloud', 'ui.utils.masks'])

  .controller('allCategoriesController', ['factoryService', '$scope', '$stateParams', '$ionicLoading', '$ionicPopup',
    function (factoryService, $scope, $stateParams, $ionicLoading, $ionicPopup) {
      var url = "http://appshop.etprogramador.ga/public/rest/category/all";

      $ionicLoading.show();

      factoryService.lista(url).then(function (response) {
        $scope.categorias = response;
        console.log("OK");
        $ionicLoading.hide();
      }, function (error) {
        console.log(error);
        $ionicPopup.alert({
          title: 'Atenção',
          template: error.data
        });
        $ionicLoading.hide();
      }).finally(function () {
        $ionicLoading.hide();
      })
    }])

  .controller('homeController', ['$scope', '$stateParams', '$ionicUser',
    function ($scope, $stateParams, $ionicUser) {

      $ionicUser.set('birthdate', '5/17/1985');

    }])

  .controller('profileController', ['factoryService', '$scope', '$stateParams', '$ionicUser', '$ionicLoading',
    function (factoryService, $scope, $stateParams, $ionicUser, $ionicLoading) {

      $scope.dados = {};

      $ionicLoading.show();

      console.log($ionicUser.details.name);

      // Ionic infor
      if ($ionicUser.details.name !== null) {
        $scope.dados.nome = $ionicUser.details.name;
        $scope.dados.email = $ionicUser.details.email;
      } else {
        $scope.dados.nome = $ionicUser.social.facebook.data.full_name;
        $scope.dados.email = $ionicUser.social.facebook.data.email;
      }

      var storage = window.localStorage;
      var id = storage.getItem("userID");
      var url = "http://appshop.etprogramador.ga/public/rest/purchased/order/" + id;

      console.log(url);

      factoryService.lista(url).then(function (response) {
        $scope.infos = response;
      }, function (error) {
        console.log(error);
      }).finally(function () {
        $ionicLoading.hide();
      });

    }])

  .controller('signInController', ['factoryService', '$scope', '$stateParams', '$ionicAuth', '$ionicLoading', '$ionicHistory', '$state', '$ionicPopup', '$ionicUser', '$http',
    function (factoryService, $scope, $stateParams, $ionicAuth, $ionicLoading, $ionicHistory, $state, $ionicPopup, $ionicUser, $http) {

      $scope.data = {};

      // Login usando a conta do ionic
      $scope.signInIonic = function () {
        $ionicLoading.show();

        var details = {'email': $scope.data.email, 'password': $scope.data.password};

        $ionicAuth.login('basic', details).then(function () {
          console.log("Ok");
          $ionicLoading.hide();

          // Gravando o usuario logado
          var storage = window.localStorage;
          storage.setItem("logado", true);
          // Salcando os dados em cache
          console.log($ionicUser.details.username);
          storage.setItem("userID", $ionicUser.details.username);
          storage.setItem("userName", $ionicUser.details.name);
          storage.setItem("userEmail", $ionicUser.details.email);

          // Limpando a pilha de activities
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
            template: 'E-mail ou senha incorretos'
          });
        })
      };

      $scope.signInFacebook = function () {

        $ionicLoading.show();


        $ionicAuth.login('facebook').then(function () {


          // Detalhes da Conta salva no banco de dados proprio
          var params = {
            "user_id": $ionicUser.social.facebook.uid,
            "nome": $ionicUser.social.facebook.data.full_name,
            "email": $ionicUser.social.facebook.data.email
          };

          factoryService.lista("http://appshop.etprogramador.ga/public/rest/user/result/row/" + $ionicUser.social.facebook.uid).then(function (response) {
            $scope.categorias = response;

            console.log(response.toString());
            var result = response.toString();
            if (result !== "1") {

              $http.post("http://appshop.etprogramador.ga/public/rest/user/add", JSON.stringify(params)).then(function successCallback(response) {
                console.log("successCallback" + response.data);

                if ($ionicAuth.isAuthenticated()) {
                  // Leva para a tela de login se ocorreu tudo ok
                  $ionicHistory.clearCache().then(function () {
                    $ionicHistory.clearHistory();
                    $state.go('tabsController.home');
                    $ionicHistory.nextViewOptions({
                      disableAnimate: true,
                      disableBack: true
                    });
                  });
                  // Gravando o usuario logado
                  var storage = window.localStorage;
                  storage.setItem("logado", true);
                  // Salcando os dados em cache
                  console.log($ionicUser.social.facebook.uid);
                  storage.setItem("userID", $ionicUser.social.facebook.uid);
                  storage.setItem("userName", $ionicUser.social.facebook.data.full_name);
                  storage.setItem("userEmail", $ionicUser.social.facebook.data.email);
                  $ionicLoading.hide();
                }


              }, function errorCallback(response) {
                console.log("errorCallback" + response.data + response.status);
                $ionicLoading.hide();
                $ionicPopup.alert({
                  title: 'Atenção',
                  template: response.data
                });
              });
            } else {
              if ($ionicAuth.isAuthenticated()) {
                // Leva para a tela de login se ocorreu tudo ok
                $ionicHistory.clearCache().then(function () {
                  $ionicHistory.clearHistory();
                  $state.go('tabsController.home');
                  $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                  });
                });
                // Gravando o usuario logado
                var storage = window.localStorage;
                storage.setItem("logado", true);
                $ionicLoading.hide();
              }
            }
            console.log("OK");
          }, function (error) {
            console.log(error);
          }).finally(function () {
            $ionicLoading.hide();
          })

        }, function (erro) {
          $ionicPopup.alert({
            title: 'Atenção',
            template: erro.data
          });
          $ionicLoading.hide();
        });


      }

    }])

  .controller('signUpController', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$ionicLoading', '$ionicHistory', '$state', '$ionicPopup', '$http',
    function ($scope, $stateParams, $ionicAuth, $ionicUser, $ionicLoading, $ionicHistory, $state, $ionicPopup, $http) {

      $scope.data = {};

      /**
       * Login Usando o ionic salvando o usuário no banco de dados
       * ***************OBS: Método com erro, não produção********************
       * Primeiro salvamos o usuário no banco de dados proprio, depois se ocorreu tudo ok salvamos no ionic para
       * gerenciamento de contas e mensagens push, essa meneira pode ocorrer problemas com o app em produção
       */
      $scope.signUpLoginIonic = function () {

        $ionicLoading.show();

        // Detalhes da conta do IONIC
        var details = {
          'username': $scope.data.user,
          'name': $scope.data.name,
          'email': $scope.data.email,
          'password': $scope.data.password
        };

        console.log($scope.data.name);

        // Detalhes da Conta salva no banco de dados proprio
        var params = {
          "user_id": $scope.data.user,
          "nome": $scope.data.name,
          "email": $scope.data.email,
          "telefone": $scope.data.tel
        };

        $http.post("http://appshop.etprogramador.ga/public/rest/user/add", JSON.stringify(params)).then(function successCallback(response) {
          console.log("successCallback" + response.data);

          $ionicAuth.signup(details).then(function () {
            $ionicPopup.alert({
              title: 'Atenção',
              template: response.data
            });

            // Leva para a tela de login se ocorreu tudo ok
            $ionicHistory.clearCache().then(function () {
              $ionicHistory.clearHistory();
              $state.go('signIn');
              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });
            });
            console.log("Ok");
            $ionicLoading.hide();

            // Erro do ionic account
          }, function (err) {
            console.log("Erro" + err);

            $ionicPopup.alert({
              title: 'Atenção',
              template: 'Erro na criação do usuário'
            });
            $ionicLoading.hide();
          });

          // Erro servidor proprio
        }, function errorCallback(response) {
          console.log("errorCallback" + response.data + response.status);
          $ionicPopup.alert({
            title: 'Atenção',
            template: response.data
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
            title: 'Não existe itens no carrinho de compras',
            template: 'Adicione algum produto para prosseguir com a compra'
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
              title: "O endereço está no raio de entrega!",
              template: 'Prosseguindo com a compra.'
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
      var url = "http://appshop.etprogramador.ga/public/rest/product/category/" + idCategoria;
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
      var url = "http://appshop.etprogramador.ga/public/rest/product/" + id;
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

  .controller('deliveryAddressController', ['sharedCartService', 'factoryService', '$scope', '$stateParams', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$state', '$http',
    function (sharedCartService, factoryService, $scope, $stateParams, $ionicLoading, $ionicPopup, $ionicHistory, $state, $http) {

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.pagamentoList = [
          {text: "Cartão de débito", value: "debito"},
          {text: "Cartão de crédito", value: "credito"},
          {text: "Dinheiro", value: "dinheiro"},
          {text: "Vale Refeição", value: "refeicao"}
        ];

        $scope.data = {
          clientSide: 'ng'
        };

        // Informações do carrinho de compras
        $scope.cart = sharedCartService.cart;
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = parseFloat(sharedCartService.total_amount);

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

        console.log($scope.data.serverSide);

        if ($scope.data.serverSide === null || $scope.data.serverSide === undefined) {
          $ionicPopup.alert({
            title: "Atenção",
            template: 'Escolha uma forma de pagamento.'
          })
        } else {

          $ionicLoading.show();

          var storage = window.localStorage;

          $scope.pagamento = {};

          var params = {
            'pedido': storage.getItem("pedido"),
            'endereco': $scope.street + " " + $scope.neighborhood + " " + $scope.code,
            'valor_total': storage.getItem("valorPeido"),
            'status': "Item Comprado",
            'forma_pagamento': $scope.data.serverSide,
            'user_id': storage.getItem("userID")
          };


          $http.post("http://appshop.etprogramador.ga/public/rest/purchased/add", JSON.stringify(params)).then(function successCallback(response) {
            console.log("successCallback" + response.data);

            console.log(params);

            //Remove Itens do cache
            storage.removeItem("pedido");
            storage.removeItem("valorPeido");

            $ionicLoading.hide();

            // Limpando o carrinho de compras
            for (var i = 0, len = $scope.cart.length; i < len; i++) {
              console.log($scope.cart[i].cart_item_id);
              $scope.cart.drop($scope.cart[i].cart_item_id);
            }

            $ionicPopup.alert({
              title: "Compra realizada com sucesso!",
              template: response.data
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

            // Erro servidor proprio
          }, function errorCallback(response) {
            console.log("errorCallback" + response.data + response.status);
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Atenção',
              template: response.data
            });
          });
        }
      }
    }]);

