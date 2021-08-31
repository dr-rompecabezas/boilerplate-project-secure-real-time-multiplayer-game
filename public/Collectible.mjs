import {
  getRandomInt,
  LEFT_WALL,
  RIGHT_WALL,
  TOP_WALL,
  BOTTOM_WALL
} from './canvas.mjs'

export default class Collectible {
  constructor({x = getRandomInt(LEFT_WALL + 16, RIGHT_WALL - 16), y = getRandomInt(TOP_WALL + 16, BOTTOM_WALL - 16), value = 1, id = Date.now()}) {
    this.image = this.randomizeImage()
    this.position = {x: x, y: y}
    this.value = value
    this.id = id
    this.size = 16
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y
    );
  }

  randomizeImage() {
    const bitcoin = document.getElementById("bitcoin")
    const ethereum = document.getElementById("ethereum")
    const dollar = document.getElementById("dollar")
    const imageArray = [bitcoin, ethereum, dollar]
    return imageArray[Math.floor(Math.random() * 3)]
  }

}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch(e) {}
