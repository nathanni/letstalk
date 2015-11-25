/**
 * Created by nni on 11/24/2015.
 */
angular.module('letstalk').controller('ChatController', [
    '$scope', '$compile', 'chatFactory', 'connection', function ($scope, $compile, chatFactory, connection) {

        $scope.client = connection.client;
        $scope.message = "";
        $scope.topic = "";

        //publish a message
        $scope.send = function () {
            $scope.client.publish($scope.topic,
                JSON.stringify({
                    Id: $scope.client_id,
                    Msg: $scope.message
                }),
                {qos: 1, retain: true},
                function () {
                    console.log($scope.message);
                    appendSentMsg($scope.message, $scope.client_id);
                    $scope.message = "";
                });
        };

        var appendSentMsg = function(message){
            $('.panel-body').append($compile("<div sender-msg message='"+message+"' Id='"+ $scope.client_id+"'></div>")($scope));
        };


    }]);