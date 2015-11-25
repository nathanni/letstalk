/**
 * Created by Nathan on 11/25/15.
 */
angular.module('letstalk')
    .controller('HomeController', ['$scope', '$state', function ($scope, $state) {

        $scope.navView = "nav";
        $scope.mainView = "login";

        $scope.$on('handleClient', function () {
            $scope.navView = "userNav";
            $scope.mainView = "main";
            $state.go('index.lobby');
        });

    }]);