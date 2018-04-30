'use strict'
var app = angular.module('app', ['ui.bootstrap', 'ngAnimate', 'ngRoute', 'ngMessages'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/html/main.html',
            controller: 'MainController'
        }).when('/cart', {
            templateUrl: 'app/html/cart.html',
            controller: 'CartController'
        }).when('/shopping', {
            templateUrl: 'app/html/shopping.html',
            controller: 'ShoppingController'
        }).when('/about', {
            templateUrl: 'app/html/about.html',
        }).when('/contact', {
            templateUrl: 'app/html/contact.html',
            controller: 'ContactController'
        }).when('/product/:name', {
            templateUrl: 'app/html/detail.html',
            controller: 'DetailController'
        });
    });