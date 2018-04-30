'use strict'

app.controller('DetailController', ['$scope', '$routeParams', 'ItemService', function ($scope, $routeParams, itemService) {
    $scope.params = $routeParams;
    $scope.item = itemService.getCurrentItem($scope.params.name);
    $scope.alerts = [];

    $scope.updateStock = function updateStock(item) {
        if (item.quantity > item.totalStock) {
            item.quantity = item.oldQuantity;
            addAlert('warning', 'Not enough stock for ' + item.name, 'fa fa-exclamation-triangle');
        } else {
            item.stock = item.totalStock - item.quantity;
            item.oldQuantity = item.quantity;
        }
    }

    $scope.addItem = function addItem(item) {
        var res = itemService.addItem(item);
        if (res[1]) {
            item = res[0];
            addAlert('success', item.name + ' added!!', 'fa fa-check');
        }
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