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

  }

  calculateRank(arr) {

  }
}

export default Player;
