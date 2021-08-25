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

const player = new Player({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, score: 0, id: Date.now() })

const speed = 20
new InputHandler(player, speed)

function drawPlayer() {
  context.drawImage(
    player.image,
    player.position.x,
    player.position.y
  );
}

const collectible = new Collectible({ x: GAME_WIDTH / 3, y: GAME_HEIGHT / 3, value: 1, id: Date.now() })

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
  draw()
  lastRender = timestamp
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop)