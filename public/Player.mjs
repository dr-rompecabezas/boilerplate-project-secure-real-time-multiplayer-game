import {
  getRandomInt,
  LEFT_WALL,
  RIGHT_WALL,
  TOP_WALL,
  BOTTOM_WALL
} from './canvas.mjs'

export default class Player {
  constructor({ x = getRandomInt(LEFT_WALL + 32, RIGHT_WALL - 32), y = getRandomInt(TOP_WALL + 32, BOTTOM_WALL - 32), score = 0, id = Date.now() }) {
    this.image = document.getElementById("cat")
    this.position = { x: x, y: y }
    this.score = score
    this.id = id
    this.size = 32
  }

  movePlayer(dir, speed) {
    this.dir = dir
    this.speed = speed
    console.log(this.position)
    switch (this.dir) {
      case "left":
        this.position.x - this.speed >= LEFT_WALL ? this.position.x -= this.speed : this.position.x = LEFT_WALL
        break;
      case "right":
        this.position.x + this.size + this.speed <= RIGHT_WALL ? this.position.x += this.speed : this.position.x = RIGHT_WALL - this.size
        break;
      case "up":
        this.position.y - this.speed >= TOP_WALL ? this.position.y -= this.speed : this.position.y = TOP_WALL
        break;
      case "down":
        this.position.y + this.size + this.speed <= BOTTOM_WALL ? this.position.y += this.speed : this.position.y = BOTTOM_WALL - this.size
        break;
      default:
        break;
    }
  }

  collision(item) {
    if (item.position.y <= this.position.y + this.size
      && item.position.y + item.size >= this.position.y
      && item.position.x + item.size >= this.position.x
      && item.position.x <= this.position.x + this.size) {
      return true
    }
  }

  drawPlayer(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y
    );
  }

  calculateRank(arr) {

  }
}
