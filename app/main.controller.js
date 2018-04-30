'use strict'

app.controller('MainController', ['$scope', 'ItemService', function ($scope, itemService) {
    $scope.carouselItems = [];

    itemService.initService().then(getItemsSuccess);

    function getItemsSuccess(response) {
        $scope.carouselItems.push(itemService.getRandomItem());
        $scope.carouselItems.push(itemService.getRandomItem());
        $scope.carouselItems.push(itemService.getRandomItem());
    };
}]);