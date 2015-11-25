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
                controller : "ConnController"
            }
        }
    }).state('index.channel', {
        url: "/channel",
        views: {
            'main@index': {
                templateUrl: "views/channel.html"
            },
            'channellist@index.channel': {
                templateUrl: "views/channellist.html"
            },
            'chat@index.channel': {
                templateUrl: "views/chat.html",
                controller : "ChatController"
            }
        }

    }).state('index.userlist', {
        url: "/userlist",
        views: {
            'main@index': {
                templateUrl: "views/userlist.html"
            }
        }
    }).state('index.userlist.chat', {
        url: '/chat',
        templateUrl: 'views/chat.html'
    }).state('index.chatlist', {
        url: "/chatlist",
        views: {
            'main@index': {
                templateUrl: "views/chatlist.html"
            }
        }
    });
});