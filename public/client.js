var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});
///////////////////////////////
var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});
/////////////////////////////////

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
/////////////////////////////////
var votesA = document.getElementById('a-votes');
var votesB = document.getElementById('b-votes');
var votesC = document.getElementById('c-votes');
var votesD = document.getElementById('d-votes');

socket.on('voteCount', function (votes) {
  // debugger;
  console.log(votes);

  // debugger;
  votesA.innerText = votes["A"];
  votesB.innerText = votes["B"];
  votesC.innerText = votes["C"];
  votesD.innerText = votes["D"];
	// votesMessage.innerText = "You voted: " ;
});
//////////////////////////////////

var votesMessage = document.getElementById('votes-message');

socket.on('votesMessage', function (vote) {
  console.log(vote);
	votesMessage.innerText = "You voted: " ;
});
