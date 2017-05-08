angular.module('app.services', [])

  .factory('sharedCartService', ['$ionicPopup', function ($ionicPopup) {
    var cartObj = {};
    cartObj.cart = [];
    cartObj.total_amount = 0;
    cartObj.total_qty = 0;

    cartObj.cart.add = function (id, image, name, desc, price, qty) {
      if (cartObj.cart.find(id) !== -1) {
        var alertPopup = $ionicPopup.alert({
          title: 'Atenção',
          template: 'Este produto já se encontra no carrinho de compras.'
        });
        //cartObj.cart[cartObj.cart.find(id)].cart_item_qty+=1;
        //cartObj.total_qty+= 1;
        //cartObj.total_amount+= parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price);
      }
      else {
        cartObj.cart.push({
          "cart_item_id": id,
          "cart_item_image": image,
          "cart_item_name": name,
          "cart_item_desc": desc,
          "cart_item_price": price,
          "cart_item_qty": qty
        });
        cartObj.total_qty += 1;
        cartObj.total_amount += parseFloat(price);
        var alertPopup = $ionicPopup.alert({
          title: 'Carrinho de compras',
          template: 'Produto adicionado ao carrinho de compras'
        });
      }
    };

    cartObj.cart.find = function (id) {
      var result = -1;
      for (var i = 0, len = cartObj.cart.length; i < len; i++) {
        if (cartObj.cart[i].cart_item_id === id) {
          result = i;
          break;
        }
      }
      return result;
    };

    cartObj.cart.drop = function (id) {
      var temp = cartObj.cart[cartObj.cart.find(id)];
      cartObj.total_qty -= parseInt(temp.cart_item_qty);
      cartObj.total_amount -= ( parseFloat(temp.cart_item_qty) * parseFloat(temp.cart_item_price) );
      cartObj.cart.splice(cartObj.cart.find(id), 1);

    };

    cartObj.cart.increment = function (id) {
      cartObj.cart[cartObj.cart.find(id)].cart_item_qty+=1;
      cartObj.total_qty+= 1;
      cartObj.total_amount+=( parseFloat( cartObj.cart[cartObj.cart.find(id)].cart_item_price) );
    };

    cartObj.cart.decrement = function (id) {
      cartObj.total_qty-= 1;
      cartObj.total_amount-= parseFloat( cartObj.cart[cartObj.cart.find(id)].cart_item_price) ;


      if(cartObj.cart[cartObj.cart.find(id)].cart_item_qty === 1){  // if the cart item was only 1 in qty
        cartObj.cart.splice( cartObj.cart.find(id) , 1);  //edited
      }else{
        cartObj.cart[cartObj.cart.find(id)].cart_item_qty-=1;
      }
    };

    return cartObj;
  }])

  .service('factoryService', function ($http, $q) {

    return {
      lista: function (url) {
        return $http({
          method: 'GET',
          url: url
        }).then(function (response) {
          return response.data;
        });
      }
    };

  });


