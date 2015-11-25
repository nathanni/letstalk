/**
 * Created by nni on 11/24/2015.
 */
angular.module('letstalk').controller('NavController', ['$scope','connection', function($scope,connection) {


    $scope.clientId = "";

    //when a user connent, get client id from broadcast
    $scope.$on('handleClientId', function() {
        $scope.clientId = connection.clientId;
    });
}]);