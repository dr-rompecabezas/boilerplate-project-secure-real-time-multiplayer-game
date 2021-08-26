import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import InputHandler from './InputHandler.mjs';

// const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

const GAME_WIDTH = 640
const GAME_HEIGHT = 480
const LEFT_WALL = 5
const RIGHT_WALL = 635
const TOP_WALL = 40
const BOTTOM_WALL = 475


function drawGameScreen() {
  // draw screen
  context.fillStyle = "black"
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  // draw header text
  context.fillStyle = "white"
  context.font = "14px monospace"
  context.fillText("Controls: WASD", 40, 24)
  context.fillText("Coin Race", 290, 24)
  context.fillText("Rank 1/1", 500, 24)

  // draw walls outline
  context.strokeStyle = "white";
  context.strokeRect(
    LEFT_WALL,
    TOP_WALL,
    RIGHT_WALL - LEFT_WALL,
    BOTTOM_WALL - TOP_WALL)
}

const player = new Player({ 
  x: getRandomInt(LEFT_WALL + 32, RIGHT_WALL - 32), 
  y: getRandomInt(TOP_WALL + 32, BOTTOM_WALL - 32), 
  score: 0, 
  id: Date.now() })

const speed = 10
new InputHandler(player, speed)

function drawPlayer() {
  context.drawImage(
    player.image,
    player.position.x,
    player.position.y
  );
}

const collectible = new Collectible({ 
  x: getRandomInt(LEFT_WALL + 16, RIGHT_WALL - 16), 
  y: getRandomInt(TOP_WALL + 16, BOTTOM_WALL - 16), 
  value: 1, 
  id: Date.now() })

function updateCollectible(item) {
  if (player.collision(item)) {
    item.image = item.randomizeImage()
    item.position.x = getRandomInt(LEFT_WALL + item.size, RIGHT_WALL - item.size)
    item.position.y = getRandomInt(TOP_WALL + item.size, BOTTOM_WALL - item.size)
    console.log(item.position)
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

function drawCollectible() {
  collectible.draw(context)
}

function draw() {
  drawGameScreen()
  drawPlayer()
  drawCollectible()
}

let lastRender = 0
function loop(timestamp) {
  const deltaTime = timestamp - lastRender
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  update()
  draw()
  lastRender = timestamp
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)