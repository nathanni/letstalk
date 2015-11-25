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
server.on('subscribed', subscribed);
server.on('clientDisconnecting', clientDisconnecting);
server.on('clientDisconnected', clientDisconnected);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

// fired whena  client is connected
function clientConnected(client) {
    console.log('Client connected', client.id);
}

// fired when a message is received
function published (packet, client) {
    console.log('Published', packet.payload);
}

// fired when a client subscribes to a topic
function subscribed (topic, client) {
    console.log('subscribed : ', topic);
}

// fired when a client is disconnecting
function clientDisconnecting(client) {
    console.log('clientDisconnecting : ', client.id);
}

// fired when a client is disconnected
function clientDisconnected(client) {
    console.log('clientDisconnected : ', client.id);
}





//express start http server
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/'));

app.get('/',function (req, res) {
    console.log('load test page');
    res.redirect('app/index.html');  //redirect to app
});

app.listen(3000);