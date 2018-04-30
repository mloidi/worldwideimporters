'use strict'

app.controller('ShoppingController', ['$scope', '$route', '$routeParams', '$location', '$filter', 'ItemService', function ($scope, $route, $routeParams, $location, $filter, itemService) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.selectedSubCategory = "Baby Care";
    $scope.bStock = -1;
    $scope.maxPrice = 9999;
    $scope.minPrice = 0;
    $scope.alerts = [];

    if (!itemService.isInitialize()) {
        itemService.initService().then(getItemsSuccess);
    } else {
        $scope.categories = itemService.getCategories();
        $scope.allItems = itemService.getAllItems();
    }

    function getItemsSuccess(response) {
        $scope.categories = itemService.getCategories();
        $scope.allItems = itemService.getAllItems();
    };

    $scope.setSubcategory = function (subCategory) {
        $scope.selectedSubCategory = subCategory.name;
        $scope.filterItems.subcategory = $scope.selectedSubCategory;
    };

    $scope.filterItems = function filterItems(item) {
        if ($filter('uppercase')(item.subcategory) == $filter('uppercase')($scope.selectedSubCategory) && item.stock > $scope.bStock && item.price <= $scope.maxPrice && item.price >= $scope.minPrice) {
            return true;
        }
        return false;
    };

    $scope.addItem = function addItem(item) {
        if (item.stock != 0) {
            item.quantity = 1;
        }
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