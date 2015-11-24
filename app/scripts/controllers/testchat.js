/**
 * Created by Nathan on 11/23/2015.
 */

angular.module('MyModule',[]).controller('TestChat', ['$scope', function($scope) {
    $scope.connect = function () {

        var client = mqtt.connect('ws://localhost:1889'); // you add a ws:// url here


        client.on('connect', function () {
            client.subscribe('presence');
            client.publish('presence', 'Hello mqtt');
        });

        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString());
            client.end();
        });



/*        client.subscribe("mqtt/demo");

/!*        client.on("message", function (topic, payload) {
            alert([topic, payload].join(": "));
            client.end();
        });*!/

        client.publish("mqtt/demo", "hello world!");*/
    }
}]);


