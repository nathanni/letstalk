angular.module('letstalk')
.controller('friendsController',['$scope','chatFactory','$compile',function ($scope,chatFactory,$compile) {
	$scope.friends_list=chatFactory.friends_list;

	var addChatWindow = function(topic){
 		$('#chatWindow').append($compile("<div chat-window topic = '"+topic+"''></div>")($scope));

	};

	$scope.addChatWindow = addChatWindow;

	
}]);