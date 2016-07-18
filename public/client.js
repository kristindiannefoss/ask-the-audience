var Chart = require('src/chart.js')
// let myChart = new Chart({...})

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
var totalVotes = document.getElementById('totals');

var votesA = document.getElementById('a-votes');
var votesB = document.getElementById('b-votes');
var votesC = document.getElementById('c-votes');
var votesD = document.getElementById('d-votes');

socket.on('voteCount', function (votes) {
  console.log(votes);
  votesA.innerText = votes["A"];
  votesB.innerText = votes["B"];
  votesC.innerText = votes["C"];
  votesD.innerText = votes["D"];
  // debugger;
  // totals.innerHTML = votes;
  votesGraph(votesA,votesB,votesC,votesD);
});

//////////////////////////////////
var yourVotesMessage = document.getElementById('votes-message');

socket.on('voteMessage', function (message) {
  console.log(message);
  yourVotesMessage.innerHTML = message;
});
///////////////////////////////////

function votesGraph(A,B,C,D){
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [A,B,C,D],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });}
