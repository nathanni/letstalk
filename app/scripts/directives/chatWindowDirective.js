angular.module('letstalk').directive('chatWindow', ['connection','$compile',function (connection,$compile) {
	return {
		restrict: 'AE',
		templateUrl:'views/friends/chatWindow.html',
		scope:{
			topic:'@topic'
		},
		link: function (scope, iElement, iAttrs) {
			
			scope.clientId=connection.clientId;
			scope.message = "";
			scope.client=connection.client;
			

			var send = function(){
				console.log(scope.message);
				scope.client.publish("topic/"+scope.topic,
                JSON.stringify({
                    Id: scope.clientId,
                    Msg: scope.message
                }),
                {qos: 1, retain: true},
                function () {
                    console.log(scope.message);
                    appendSentMsg(scope.message);
                    scope.message = "";
                });


                

			};
			

			scope.send=send;

			scope.client.on('message', function (topic, message) {
			
            // message is Buffer
            var packet = JSON.parse(message);
            if (packet.Id === scope.topic)
                appendReceviedMsg(packet.Msg, packet.Id);
        });

			

		var appendSentMsg = function (message) {
            $('#'+scope.topic+'-panel').append($compile("<div sender-msg message='" + message + "' Id='" + scope.clientId + "'></div>")(scope));
        };

        var appendReceviedMsg = function (message, id) {
        	console.log(id);
            $('#'+scope.topic+'-panel').append($compile("<div receiver-msg message='" + message + "' Id='" + id + "'></div>")(scope));
        };

		}
	};
}]);
 