/**
 * Created by Nathan on 11/23/2015.
 */
var letstalk = angular.module('letstalk', ['ui.router',
                                           'ui.bootstrap',
                                           'ui.keypress',
                                           'luegg.directives']);


letstalk.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/index");

    $stateProvider.state('index', {
        url: "/index",
        views: {
            '': {
                templateUrl: "views/home.html",
                controller: "HomeController"
            },
            'nav@index': {
                templateUrl: "views/nav.html"
            },
            'userNav@index': {
                templateUrl: "views/usernav.html",
                controller : "NavController"
            },
            'login@index': {
                templateUrl: "views/login.html",
                controller : "ConnController"
            }
        }
    }).state('index.lobby', {
        url: "/lobby",
        views: {
            'main@index': {
                templateUrl: "views/lobby/lobby.html"
            },
            'channels@index.lobby': {
                templateUrl: "views/lobby/channels.html"
            },
            'chat@index.lobby': {
                templateUrl: "views/chat/chat.html",
                controller : "ChatController"
            }
        }

    }).state('index.friends', {
        url: "/friends",
        views: {
            'main@index': {
                templateUrl: "views/friends/friendlist.html",
                controller:'friendsController',
                controllerAs:'FC'
            }
        }
    }).state('index.friends.chat', {
        url: '/chat',
        templateUrl: 'views/chat/chat.html'
    }).state('index.groups', {
        url: "/groups",
        views: {
            'main@index': {
                templateUrl: "views/groups/grouplist.html"
            }
        }
    });
});