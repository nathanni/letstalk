angular.module('letstalk')
.controller('friendsController',['$scope','chatFactory','$compile','chatManager',function ($scope,chatFactory,$compile,chatManager) {
	$scope.friends_list=chatFactory.friends_list;

	var addChatWindow = function(topic){
		if(chatManager.getScope(topic) === undefined)
 		$('#chatWindow').append($compile("<div chat-window topic = '"+topic+"''></div>")($scope));

	};

	$scope.addChatWindow = addChatWindow;

	
}]);