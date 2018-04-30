'use strict'

app.controller('CartController', ['$scope', '$routeParams', 'ItemService', function ($scope, $routeParams, itemService) {
    $scope.params = $routeParams;
    $scope.taxes = 10;
    $scope.totalPrice = 0;
    $scope.totalPriceWithTaxes = 0;
    $scope.alerts = []; 

    $scope.cart = itemService.getCartItems();
    calculateTotalPriceWithTaxes();

    /********** TODO the cart form submit*/
    $scope.hideMessageOrder = true;
    $scope.formData = {
        inputName: '',
        inputEmail: '',
        inputPhone: '',
        inputAddress: '',
        inputCity: '',
        inputState: '',
        inputZip: ''
    }
    $scope.submitOrder = function submitOrder() {
        $scope.hideMessageOrder = false;
        $scope.formData.inputName = '';
        $scope.formData.inputEmail = '';
        $scope.formData.inputPhone = '';
        $scope.formData.inputMessage = '';
        $scope.formData.inputAddress = '';
        $scope.formData.inputCity = '';
        $scope.formData.inputState = '';
        $scope.formData.inputZip = '';
    }

    $scope.dismissMessageOrder = function dismissMessageOrder() {
        $scope.hideMessageOrder = true;
    };
    /*********** */

    $scope.removeItem = function removeItem(itemCart) {
        var res = itemService.removeItemFromCart(itemCart);
        if (res[1]) {
            itemCart = res[0];
            calculateTotalPriceWithTaxes();
            addAlert('success', 'Item ' + itemCart.name + ' removed!!', 'fa fa-check');
        }
    }

    $scope.updatePrice = function updatePrice(itemCart) {
        var res = itemService.updateCartItem(itemCart);
        if (res[1]) {
            itemCart = res[0];
            calculateTotalPriceWithTaxes();
        } else {
            addAlert('warning', 'Not enough stock for  ' + itemCart.name, 'fa fa-exclamation-triangle');
        }
    }

    function calculateTotalPriceWithTaxes() {
        $scope.totalPrice = 0;
        for (var indexCart = 0; indexCart < $scope.cart.length; indexCart++) {
            $scope.totalPrice = $scope.totalPrice + ($scope.cart[indexCart].price * $scope.cart[indexCart].quantity);
        }
        $scope.totalPriceWithTaxes = $scope.totalPrice + ($scope.totalPrice * $scope.taxes / 100);
    }

    $scope.dismissAlert = function dismissAlert(index) {
        $scope.alerts.splice(index, 1);
    };

    function addAlert(type, text, icon) {
        $scope.alerts.push({
            type: type,
            text: text,
            icon: icon
        });
    };
}]);