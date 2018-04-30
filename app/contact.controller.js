'use strict'

app.controller('ContactController', ['$scope', '$routeParams', 'ItemService', function ($scope, $routeParams, itemService) {
    $scope.params = $routeParams;
    $scope.hideMessageContact = true;
    $scope.formData = {
        inputName: '',
        inputEmail: '',
        inputSubject: '',
        inputMessage: ''
    }

    $scope.submitContact = function submitContact() {
        $scope.hideMessageContact = false;
        $scope.formData.inputName = '';
        $scope.formData.inputEmail = '';
        $scope.formData.inputSubject = '';
        $scope.formData.inputMessage = '';
    }

    $scope.dismissMessageContact = function dismissMessageContact() {
        $scope.hideMessageContact = true;
    };
}]);