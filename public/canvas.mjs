const GAME_WIDTH = 640
const GAME_HEIGHT = 480
const LEFT_WALL = 5
const RIGHT_WALL = 635
const TOP_WALL = 40
const BOTTOM_WALL = 475

function drawGameScreen(context) {
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

export {
  drawGameScreen,
  GAME_WIDTH,
  GAME_HEIGHT,
  LEFT_WALL,
  RIGHT_WALL,
  TOP_WALL,
  BOTTOM_WALL
}