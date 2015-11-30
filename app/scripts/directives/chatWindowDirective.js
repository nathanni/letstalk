angular.module('letstalk').directive('chatWindow', ['connection','$compile','chatManager',function (connection,$compile,chatManager) {
	return {
		restrict: 'AE',
		templateUrl:'views/friends/chatWindow.html',
		scope:{
			topic:'@topic'
		},
		//replace:true,
		link: function (scope, iElement, iAttrs) {
			chatManager.storeScope(scope.topic,scope);
			scope.clientId=connection.clientId;
			scope.message = "";
			scope.client=connection.client;

			scope.msgQ = chatManager.msgQs[scope.topic];
			
			//console.log(scope.msgQ);
			var send = function(){
				if(scope.message===""){
					scope.$apply();
					return;
				};
				var time = moment().format('YYYY-MM-DD HH:m:s');
				scope.client.publish("topic/"+scope.topic,
                JSON.stringify({
                    Id: scope.clientId,
                    Msg: scope.message,
                    Time: time
                }),
                {qos: 1, retain: true},
                function () {
                	scope.msgQ.push({
                					_id:scope.clientId,
                           			_msgBody:scope.message,
                            		_time:time
                	});
                    //appendSentMsg(scope.message);
                    scope.message = "";
          
                    scope.$apply();
                });
			};

			scope.send=send;

		}
	};
}]);
 