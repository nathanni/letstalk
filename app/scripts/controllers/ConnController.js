/**
 * Created by Nathan on 11/24/2015.
 */
angular.module('letstalk')
    .controller('ConnController',['$scope','$location','chatFactory', 'connection','chatManager',function($scope,$location,chatFactory,connection,chatManager) {
        $scope.clientId = "";
        $scope.topic = "";
        $scope.client="";

       

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

                

                //subscribe topics
                $scope.subscribe('topic');

                $scope.subscribe($scope.topic);

                $scope.subscribe('topic/'+$scope.clientId);

                //fire on when a msg is received
                $scope.client.on('message', function (topic, message) {
                    
                    // message is Buffer
                    var packet = JSON.parse(message);
                    //push a msg to msgQ
                    chatManager.msgQs[packet.Id].push({
                                                       _id:packet.Id,
                                                       _msgBody:packet.Msg,
                                                       _time:packet.Time
                                                     });
                    var chatWindow = chatManager.getScope(packet.Id);
                    if(chatWindow !== undefined)
                    //refresh chatwidow
                    chatWindow.$apply();

                    else if(chatWindow === undefined){
                    // notification
                    console.log('notification on '+packet.Id);
                    }
                    
                });



                //save client to global
                connection.setClient($scope.client);

                $scope.$apply();
            });

        };

        $scope.subscribe=function(topic){
        if($scope.client !== "")
            $scope.client.subscribe(topic,{qos:1},function(err, granted){
                    if(err)
                        console.log('subscribe failed');
                    if(granted){
                        if(chatManager.msgQs[topic] === undefined){
                        chatManager.msgQs[topic]=[];
                        //console.log(chatManager.msgQs[topic]);
                    }
                }
            });
         };

         // make subscribe a globle function
        connection.subscribe = $scope.subscribe;

}]);