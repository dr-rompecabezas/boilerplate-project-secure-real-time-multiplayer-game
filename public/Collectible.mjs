class Collectible {
  constructor({x, y, value, id}) {
    this.image = document.getElementById("bitcoin")
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

}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch(e) {}

export default Collectible;
