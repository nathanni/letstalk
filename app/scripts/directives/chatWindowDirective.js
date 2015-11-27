angular.module('letstalk').directive('chatWindow', ['connection','$compile','chatManager',function (connection,$compile,chatManager) {
	return {
		restrict: 'AE',
		templateUrl:'views/friends/chatWindow.html',
		scope:{
			topic:'@topic'
		},
		link: function (scope, iElement, iAttrs) {
			chatManager.storeScope(scope.topic,scope);
			scope.clientId=connection.clientId;
			scope.message = "";
			scope.client=connection.client;

			scope.msgQ = chatManager.msgQs[scope.topic];
			
			//console.log(scope.msgQ);
			var send = function(){
				
				scope.client.publish("topic/"+scope.topic,
                JSON.stringify({
                    Id: scope.clientId,
                    Msg: scope.message
                }),
                {qos: 1, retain: true},
                function () {
                	scope.msgQ.push({
                					_id:scope.clientId,
                           			_msgBody:scope.message,
                            		_time:Date()
                	});
                    //appendSentMsg(scope.message);
                    scope.message = "";
          
                    scope.$apply();
                });
			};
			


			scope.send=send;

			// scope.client.on('message', function (topic, message) {
			
   //          // message is Buffer
   //          var packet = JSON.parse(message);
   //          if (packet.Id === scope.topic)
   //              appendReceviedMsg(packet.Msg, packet.Id);
   //      });

			

		// var appendSentMsg = function (message) {
  //           $('#'+scope.topic+'-panel').append($compile("<div sender-msg message='" + message + "' Id='" + scope.clientId + "'></div>")(scope));
  //       };

  //       var appendReceviedMsg = function (message, id) {
  //           $('#'+scope.topic+'-panel').append($compile("<div receiver-msg message='" + message + "' Id='" + id + "'></div>")(scope));
  //       };

		}
	};
}]);
 