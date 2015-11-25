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
        this.broadcastClient();
    };

    connection.setClientId = function(id) {
        this.clientId = id;
    };

    connection.setTopic = function(topic) {
        this.topic = topic;
    };

    //client broadcast
    connection.broadcastClient = function() {
        $rootScope.$broadcast('handleClient');
    };

    return connection;
}]);