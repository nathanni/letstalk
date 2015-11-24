/**
 * Created by Nathan on 11/23/2015.
 */
var letstalk = angular.module('Letstalk', ['ui.router','ui.bootstrap']);


letstalk.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/index");

    $stateProvider.state('index', {
        url: "/index",
        views: {
            '': {
                templateUrl: "views/home.html"
            },
            'nav@index': {
                templateUrl: "views/nav.html"
            },
            'main@index': {
                templateUrl: "views/main.html"
            }
        }
    })
    .state('index.userlist', {
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