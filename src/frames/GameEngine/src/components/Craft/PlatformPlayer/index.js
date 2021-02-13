// State variables
let [isJumping, setIsJumping] = useState(false);

/*
  PlatformPlayer
*/

class PlatformPlayer extends TileMap2DPlayer {

  // Player jump
  jump() {
    console.log('Jump!');
  }

  // Handle global keydown
  onKeyDown(event) {
    // Early escape if tile map isAnimating or input is invalid
    if (Stage.isAnimating() || !event?.code) {
      return;
    }

    const keyCode = event.code.toUpperCase().replace('KEY', '');

    // Early escape if input is invalid
    if (!KEYS[keyCode]) {
      return;
    }

    // Route key
    switch (keyCode) {
      case KEY_BINDINGS.LEFT:
        playerX = setPlayerX(playerX - 1);
        Stage.pan(DIRECTIONS.LEFT, this.getSetAreaTiles);

        break;

      case KEY_BINDINGS.RIGHT:
        playerX = setPlayerX(playerX + 1);
        Stage.pan(DIRECTIONS.RIGHT, this.getSetAreaTiles);

        break;

      case KEY_BINDINGS.JUMP:
        this.jump();
        Stage.jump();

        break;
      default:
        break;
    }
  }

  // Handle render
  onRender() {

  }
}
