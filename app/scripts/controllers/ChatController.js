/**
 * Created by nni on 11/24/2015.
 */
angular.module('letstalk').controller('ChatController', [
    '$scope', '$compile', 'chatFactory', 'connection', function ($scope, $compile, chatFactory, connection) {

        $scope.client = connection.client;
        $scope.message = "";
        $scope.topic = connection.topic;
        $scope.clientId = connection.clientId;

        //publish a message
        $scope.send = function () {

            $scope.client.publish($scope.topic,
                JSON.stringify({
                    Id: $scope.clientId,
                    Msg: $scope.message
                }),
                {qos: 1, retain: true},
                function () {
                    console.log($scope.message);
                    appendSentMsg($scope.message, $scope.client_id);
                    $scope.message = "";
                });
        };



        //fire on when recevie a message
        $scope.client.on('message', function (topic, message) {
            // message is Buffer
            var packet=JSON.parse(message);
            if(packet.Id !== $scope.clientId)
                appendReceviedMsg(packet.Msg,packet.Id);
        });

        var appendSentMsg = function(message){
            $('.panel-body').append($compile("<div sender-msg message='"+message+"' Id='"+ $scope.client_id+"'></div>")($scope));
        };

        var appendReceviedMsg = function(message,id){
            $('.panel-body').append($compile("<div receiver-msg message='"+message+"' Id='"+id+"'></div>")($scope));
        };

    }]);