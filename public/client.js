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
var totals = document.getElementById('d-votes');

socket.on('voteCount', function (votes) {
  // debugger;
  console.log(votes);

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
  // debugger;
  votesA.innerText = votes["A"];
  votesB.innerText = votes["B"];
  votesC.innerText = votes["C"];
  votesD.innerText = votes["D"];
	// votesMessage.innerText = "You voted: " ;
	// totals.innerText = [ voteCount["A"], voteCount["B"], voteCount["C"], voteCount["D"]];
});
//////////////////////////////////

var votesMessage = document.getElementById('votes-message');

socket.on('votesMessage', function (votes) {
  console.log(votes);
	votesMessage.innerText = votes + "Cheese " ;
});
