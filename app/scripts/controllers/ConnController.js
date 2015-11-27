/**
 * Created by Nathan on 11/24/2015.
 */
angular.module('letstalk')
    .controller('ConnController',['$scope','$location','chatFactory', 'connection','chatManager',function($scope,$location,chatFactory,connection,chatManager) {
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
                    if(err)
                        console.log('subscribe failed');
                });

                $scope.client.subscribe('topic/'+$scope.clientId,{qos:1},function(err, granted){
                    if(err)
                        console.log('subscribe failed');
                    
                });
                //fire on when a msg is received
                $scope.client.on('message', function (topic, message) {
                    
                    // message is Buffer
                    var packet = JSON.parse(message);
                    
                    chatManager.msgQs[packet.Id].push({
                                                       _id:packet.Id,
                                                       _msgBody:packet.Msg,
                                                       _time:Date()
                                                     });
                    var chatWindow = chatManager.getScope(packet.Id);
                    if(chatWindow !== undefined)
                        chatWindow.$apply();
                    
                });

                //save client to global
                connection.setClient($scope.client);
            });

        };

}]);