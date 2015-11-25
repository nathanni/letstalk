/**
 * Created by Nathan on 11/24/2015.
 */
angular.module('letstalk').factory('connection', ['$rootScope', function ($rootScope) {

    var connection = {};

    connection.client = {};
    connection.clientId = "";
    connection.topic="";

    connection.setClient = function(client) {
        this.client = client;
    };

    connection.setClientId = function(id) {
        this.clientId = id;
        this.broadcastId();
    };

    connection.setTopic = function(topic) {
        this.topic = topic;
    };

    //client id broadcast
    connection.broadcastId = function() {
        $rootScope.$broadcast('handleClientId');
    };

    return connection;
}]);