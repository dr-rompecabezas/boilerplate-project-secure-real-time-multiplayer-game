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

// const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

// initiate player and controls
const playerSpeed = 20
const player = new Player({})
new InputHandler(player, playerSpeed)

// initiate coin
const collectible = new Collectible({})

function updateCollectible(item) {
  if (player.collision(item)) {
    item.image = item.randomizeImage()
    item.position.x = getRandomInt(LEFT_WALL + item.size, RIGHT_WALL - item.size)
    item.position.y = getRandomInt(TOP_WALL + item.size, BOTTOM_WALL - item.size)
  }
}

let lastRender;
function loop(timestamp) {
  const deltaTime = timestamp - lastRender
  lastRender = timestamp
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  updateCollectible(collectible)
  drawGameScreen(context)
  player.drawPlayer(context)
  collectible.draw(context)
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)