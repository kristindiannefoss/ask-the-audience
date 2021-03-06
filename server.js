const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)
.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});
const socketIo = require('socket.io');
const io = socketIo(server);
app.use(express.static('public'));
app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('userConnection', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  // socket.emit('votesMessage', message);
  var votes = {};

  function countVotes(votes) {
  var voteCount = {
      A: votes["A"],
      B: votes["B"],
      C: votes["C"],
      D: votes["D"]
  };
  // debugger;
    for (var vote in votes) {
      // debugger;
      voteCount[votes[vote]]++;
    }
    return voteCount;
  }

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
      socket.emit('votesMessage', 'You voted');
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});

module.exports = server;
