/**
 * Created by nni on 11/24/2015.
 */
angular.module('letstalk').controller('NavController', ['$scope','chatFactory', function($scope,chatFactory) {


    $scope.clientId = "";

    //when a user connent
    $scope.$on('handleClientId', function() {
        $scope.clientId = chatFactory.options.clientId;
    });
}]);