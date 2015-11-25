/**
 * Created by nni on 11/24/2015.
 */
angular.module('letstalk').controller('NavController', ['$scope','$location','connection', function($scope, $location,connection) {


    $scope.clientId = "";

    //when a user connent, get client id from broadcast
    $scope.$on('handleClientId', function() {
        $scope.clientId = connection.clientId;
    });

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

}]);