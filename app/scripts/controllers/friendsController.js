angular.module('letstalk')
.controller('friendsController',['$scope','chatFactory','$compile','chatManager',function ($scope,chatFactory,$compile,chatManager) {
	$scope.friends_list=chatFactory.friends_list;

	var addChatWindow = function(topic){
		var Scope=chatManager.getScope(topic);
		if(Scope === undefined)
 		$('#chatWindow').append($compile("<div chat-window topic = '"+topic+"''></div>")($scope));
 		else if(Scope !== undefined){
 		$('#'+topic+'-panel').remove();
 		chatManager.storeScope(topic,undefined);
 		}

	};

	$scope.addChatWindow = addChatWindow;

	
}]);