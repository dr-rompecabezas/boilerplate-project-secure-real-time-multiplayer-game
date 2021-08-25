export default class InputHandler {
  constructor(player, speed) {
    document.addEventListener("keydown", event => {
      switch (event.code) {
        case "KeyA":
        case "ArrowLeft":
          player.movePlayer("left", speed);
          break;
        case "KeyD":
        case "ArrowRight":
          player.movePlayer("right", speed);
          break;
        case "KeyW":
        case "ArrowUp":
          player.movePlayer("up", speed);
          break;
        case "KeyS":
        case "ArrowDown":
          player.movePlayer("down", speed);
          break;
        default:
          break;
      }
    })
  }
}