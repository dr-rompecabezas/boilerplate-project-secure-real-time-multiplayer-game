import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import InputHandler from './InputHandler.mjs';
import {
  drawGameScreen,
  getRandomInt,
  GAME_WIDTH,
  GAME_HEIGHT,
  LEFT_WALL,
  RIGHT_WALL,
  TOP_WALL,
  BOTTOM_WALL
} from './canvas.mjs'

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

const playerSpeed = 5

let currPlayers =[]
let collectible;
let rank = `Rank: 1 / ${currPlayers.length}`
// let lastRender = 0

function loop(timestamp) {
  // const deltaTime = timestamp - lastRender
  // lastRender = timestamp
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  drawGameScreen(context, rank)
  currPlayers.forEach(player => player.drawPlayer(context))
  collectible.draw(context)
  requestAnimationFrame(loop)
}


socket.on('init', ({id, players, coin}) => {
  console.log(`Connected as ${id}`)

  collectible = new Collectible({x: coin.position.x, y: coin.position.y, id: coin.id})

  const mainPlayer = new Player({id})

  new InputHandler(mainPlayer, playerSpeed, socket)

  // send main player to server
  socket.emit("new-player", mainPlayer)  

  // Add new player when someone logs on
  socket.on("new-player", obj => {
    // Check that player doesn't already exist
    const playerIds = currPlayers.map(player => player.id);
    if (!playerIds.includes(obj.id)) currPlayers.push(new Player(obj));
  });
  
  // Populate list of connected players
  currPlayers = players.map(val => new Player(val)).concat(mainPlayer);

  // Handle movement
  socket.on("move-player", ({ id, posObj }) => {
    const movingPlayer = currPlayers.find(obj => obj.id === id);
    movingPlayer.position.x = posObj.x;
    movingPlayer.position.y = posObj.y;
    
    // Remove collectible on collision with player
    if (movingPlayer.collision(collectible)) {
      socket.emit('destroy-item', { playerId: movingPlayer.id, coinValue: collectible.value, coinId: collectible.id }
    )};
  });

  // Handle new coin gen
  socket.on('new-coin', newCoin => {
    collectible = new Collectible({x: newCoin.position.x, y: newCoin.position.y, id: newCoin.id});
  });

  // Update scoring player's score
  socket.on('update-player', playerObj => {
    const scoringPlayer = currPlayers.find(obj => obj.id === playerObj.id);
    scoringPlayer.score = playerObj.score;
    rank = mainPlayer.calculateRank(currPlayers)
  });
  
  // Handle player disconnection
  socket.on("remove-player", id => {
    console.log(`${id} disconnected`);
    currPlayers = currPlayers.filter(player => player.id !== id);
  });
  
  requestAnimationFrame(loop)
})