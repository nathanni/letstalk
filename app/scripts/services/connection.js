/**
 * Created by Nathan on 11/24/2015.
 */
angular.module('letstalk').factory('connection', ['$rootScope', function ($rootScope) {

    var connection = {};

    connection.client = {};
    connection.clientId = "";

    connection.setClient = function(val) {
        this.client = val;
    };

    connection.setClientId = function(id) {
        this.clientId = id;
        this.broadcastId();
    };

    //client id broadcast
    connection.broadcastId = function() {
        $rootScope.$broadcast('handleClientId');
    };

    return connection;
}]);