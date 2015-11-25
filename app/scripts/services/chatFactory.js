/**
 * Created by nni on 11/24/2015.
 */
angular.module('letstalk').factory('chatFactory', function () {

    var chatFactory = {};

    chatFactory.friends_list=['Jhon','Flash','Hawken'];
    chatFactory.groups_list=[];

    chatFactory.host='ws://localhost:1889';


    chatFactory.options = {
        keepalive: 900,
        clientId: "",
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: false,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
            topic: 'WillMsg',
            payload: 'Connection Closed abnormally..!',
            qos: 0,
            retain: false
        },
        rejectUnauthorized: false
    };


    return chatFactory;

});
