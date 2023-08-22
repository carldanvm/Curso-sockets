const { log } = require('console');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/holaMundo', function (req, res) {
    res.status(200).send('hola mundo');
})

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Carlos Vieira',
    nickname: 'Bot',
}];

io.on('connection', function (socket) {
    log('El nodo con IP: ' + socket.handshake.address + ' se ha conectado');

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    })
})

server.listen(6677, function () {
    log('listening on *:6677');
})
