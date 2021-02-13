// State variables
let [playerX, setPlayerX] = useState(10);
let [playerY, setPlayerY] = useState(10);

/*
  TileMap2DPlayer
*/

class TileMap2DPlayer extends FixedCanvas2DPlayer {
  constructor(selector) {
    super(selector);

    this.getSetAreaTiles();
  }

  // Fetch tiles from the API & update tile map
  getSetAreaTiles() {
    const response = api.getTiles(playerX, playerY);

    if (response.error) {
      console.warn(response.error.message);

      switch (direction) {
        case DIRECTIONS.UP:
          playerY = setPlayerY(playerY + 1);

          break;

        case DIRECTIONS.LEFT:
          playerX = setPlayerX(playerX + 1);

          break;

        case DIRECTIONS.DOWN:
          playerY = setPlayerY(playerY - 1);

          break;

        case DIRECTIONS.RIGHT:
          playerX = setPlayerX(playerX - 1);

          break;

        default:
          break;
      }

      return false;
    }

    Scene.setTileData(response.data);
  }

  // Handle global keydown
  onKeyDown(event) {
    // Early escape if tile map isAnimating or input is invalid
    if (Scene.isAnimating() || !event?.code) {
      return;
    }

    const keyCode = event.code.toUpperCase().replace('KEY', '');

    // Early escape if input is invalid
    if (!KEYS[keyCode]) {
      return;
    }

    switch (keyCode) {
      case KEY_BINDINGS.UP:
        playerY = setPlayerY(playerY - 1);
        Scene.pan(DIRECTIONS.UP, this.getSetAreaTiles);

        break;

        case KEY_BINDINGS.LEFT:
        playerX = setPlayerX(playerX - 1);
        Scene.pan(DIRECTIONS.LEFT, this.getSetAreaTiles);

        break;

      case KEY_BINDINGS.DOWN:
        playerY = setPlayerY(playerY + 1);
        Scene.pan(DIRECTIONS.DOWN, this.getSetAreaTiles);

        break;

      case KEY_BINDINGS.RIGHT:
        playerX = setPlayerX(playerX + 1);
        Scene.pan(DIRECTIONS.RIGHT, this.getSetAreaTiles);

        break;
      default:
        break;
    }
  }

  // Handle render
  onRender() {

  }
}
