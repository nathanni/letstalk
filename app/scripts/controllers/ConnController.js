/**
 * Created by Nathan on 11/24/2015.
 */
angular.module('letstalk')
    .controller('ConnController',['$scope','$location', 'chatFactory', 'connection',  function($scope,$location,chatFactory,connection) {
        $scope.clientId = "";
        $scope.topic = "";

        $scope.connect = function(){

            if($scope.clientId === "")
                return;
            if($scope.topic === "") $scope.topic = "default";

            //need to broadcast client id
            connection.setClientId($scope.clientId);

            //set topic
            connection.setTopic($scope.topic);

            chatFactory.options.clientId = $scope.clientId;

            //connect to server
            //$scope.client=mqtt.connect('ws://localhost:1889');
            $scope.client=mqtt.connect(chatFactory.host, chatFactory.options);

            //fire on when connect to server
            $scope.client.on('connect', function() {
                console.log('connected');

                //subscribe a topic
                $scope.client.subscribe($scope.topic,{qos:1},function(err, granted){
                    if(err){
                        console.log('subscribe failed');
                    }else{
                        console.log(granted);
                    }
                });

                //save client to global
                connection.setClient($scope.client);
            });

            //change view to lobby
            //changeView("/index/lobby");
        };

        var changeView = function (view) {
            window.path(view); // path not hash
        }
}]);