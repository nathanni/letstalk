/**
 * Created by Nathan on 11/23/2015.
 */
/**
 * Created by Nathan on 11/22/2015.
 */
var mosca = require('mosca');
var express = require('express');
var app = express();


var moscaSettings = {
    backend: {
        //using ascoltatore
        type: 'mongo',
        url: 'mongodb://localhost:27017/mqtt',
        pubsubCollection: 'ascoltatori',
        mongo: {}
    },
    persistence: {
        factory: mosca.persistence.Mongo,
        url: 'mongodb://localhost:27017/mqtt'
    },
    http: {
        port: 1889,  //web socket port
        bundle: true,
        static: './'
    }

};

var server = new mosca.Server(moscaSettings);

server.on('ready', setup);
server.on('clientConnected', clientConnected);
server.on('published', published);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

function clientConnected(client) {
    console.log('Client connected', client.id);
}

// fired when a message is received
function published (packet, client) {
    console.log('Published', packet.payload);
}


//express start http server

app.listen(3000);