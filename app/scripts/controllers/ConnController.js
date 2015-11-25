/**
 * Created by Nathan on 11/24/2015.
 */
angular.module('letstalk')
    .controller('ConnController',['$scope', 'chatFactory', 'connection',  function($scope,chatFactory,connection) {
        $scope.client_id = "";
        $scope.topic = "";

        $scope.connect = function(){

            if($scope.client_id === "")
                return;
            if($scope.topic === "") $scope.topic = "default";

            //need to broadcast client id
            connection.setClientId($scope.client_id);

            //connect to server
            $scope.client=mqtt.connect('ws://localhost:1889');
            //$scope.client=mqtt.connect(chatFactory.host, chatFactory.options);

            //fire on when connect to server
            $scope.client.on('connect', function() {
                console.log('connected');

                //$scope.client.subscribe("MyTopic");

                //subscribe a topic
                $scope.client.subscribe('topic/'+$scope.topic,{qos:1},function(err, granted){
                    if(err){
                        console.log('subscribe failed');
                    }else{
                        console.log(granted);
                    }
                });

                //save client to global
                connection.setClient($scope.client);
            });
        };
}]);