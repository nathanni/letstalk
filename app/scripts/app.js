/**
 * Created by Nathan on 11/23/2015.
 */
var letstalk = angular.module('letstalk', ['ui.router','ui.bootstrap']);


letstalk.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/index");

    $stateProvider.state('index', {
        url: "/index",
        views: {
            '': {
                templateUrl: "views/home.html"
            },
            'nav@index': {
                templateUrl: "views/nav.html",
                controller : "NavController"
            },
            'main@index': {
                templateUrl: "views/main.html",
                controller : "ChatController",
                controllerAs:"cc"
            }
        }
    }).state('index.channellist', {
        url: "/channellist",
        views: {
            'main@index': {
                templateUrl: "views/channellist.html"
            }
        }

    }).state('index.userlist', {
        url: "/userlist",
        views: {
            'main@index': {
                templateUrl: "views/userlist.html"
            }
        }
    }).state('index.chatlist', {
        url: "/chatlist",
        views: {
            'main@index': {
                templateUrl: "views/chatlist.html"
            }
        }
    }).state('index.userlist.chat', {
        url: '/chat',
        templateUrl: 'views/chat.html'
    });
});