require('dotenv').config();
const express = require('express');
const expect = require('chai');
const socket = require('socket.io');
const helmet = require('helmet')
const nocache = require("nocache");
const cors = require("cors");

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

app.use(
  helmet({
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: {
      setTo: "PHP 7.4.3",
    },
  })
);
app.use(nocache());

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
app.use(cors({origin: '*'}));
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing

// socket.io setup
const Collectible = require('./public/Collectible');
const io = socket(server);
let currPlayers = []
let destroyedCoins = []
let coin = new Collectible({})

io.sockets.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`)
  socket.emit("init", {id: socket.id, players: currPlayers, coin})
  socket.on("new-player", (obj) => {
    obj.id = socket.id
    currPlayers.push(obj)
    socket.broadcast.emit("new-player", obj)
  })

  socket.on("move-player", (obj) => {
    const movingPlayer = currPlayers.find((player) => player.id === socket.id);
    if (movingPlayer) {
      movingPlayer.position.x = obj.x;
      movingPlayer.position.y = obj.y;
      socket.broadcast.emit("move-player", {
        id: socket.id,
        posObj: {x: movingPlayer.position.x, y: movingPlayer.position.y}
      });
    }
  });

  socket.on("destroy-item", ({playerId, coinValue, coinId}) => {
    if (!destroyedCoins.includes(coinId)) {
      const scoringPlayer = currPlayers.find((obj) => obj.id === playerId);
      scoringPlayer.score += coinValue;
      destroyedCoins.push(coinId);

      // Broadcast to all players when someone scores
      io.emit("update-player", scoringPlayer);

      // Generate new coin and send it to all players
      coin = new Collectible({});
      io.emit("new-coin", coin);
    }
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("remove-player", socket.id);
    currPlayers = currPlayers.filter((player) => player.id !== socket.id);
  });
})

