class Player {
  constructor({ x, y, score, id }) {
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
        this.position.x -= this.speed
        break;
      case "right":
        this.position.x += this.speed
        break;
      case "up":
        this.position.y -= this.speed
        break;
      case "down":
        this.position.y += this.speed
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
    if (item.position.x <= this.position.x + this.size
      && item.position.x + item.size >= this.position.x
      && item.position.y + item.size >= this.position.y
      && item.position.y <= this.position.y + this.size) {
      return true
    }
  }

  calculateRank(arr) {

  }
}

export default Player;
