import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import InputHandler from './InputHandler.mjs';
import {
  drawGameScreen,
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

const player = new Player({
  x: getRandomInt(LEFT_WALL + 32, RIGHT_WALL - 32),
  y: getRandomInt(TOP_WALL + 32, BOTTOM_WALL - 32),
  score: 0,
  id: Date.now()
})

const playerSpeed = 20
new InputHandler(player, playerSpeed)

const collectible = new Collectible({
  x: getRandomInt(LEFT_WALL + 16, RIGHT_WALL - 16),
  y: getRandomInt(TOP_WALL + 16, BOTTOM_WALL - 16),
  value: 1,
  id: Date.now()
})

function updateCollectible(item) {
  if (player.collision(item)) {
    item.image = item.randomizeImage()
    item.position.x = getRandomInt(LEFT_WALL + item.size, RIGHT_WALL - item.size)
    item.position.y = getRandomInt(TOP_WALL + item.size, BOTTOM_WALL - item.size)
    // console.log(item.position)
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function update() {
  updateCollectible(collectible)
}

function draw() {
  drawGameScreen(context)
  player.drawPlayer(context)
  collectible.draw(context)
}

// let lastRender = 0
function loop(timestamp) {
  // const deltaTime = timestamp - lastRender
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  update()
  draw()
  // lastRender = timestamp
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)