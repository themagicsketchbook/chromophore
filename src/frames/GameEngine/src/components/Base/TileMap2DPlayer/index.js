// State variables
let [playerX, setPlayerX] = useState(10);
let [playerY, setPlayerY] = useState(10);

/*
  TileMap2DPlayer
*/

class TileMap2DPlayer extends Component {
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

    Stage.setTileData(response.data);
  }

  // Handle mount
  onMount() {
    document.body.onkeydown = this.onKeyDown.bind(this);
    this.getSetAreaTiles();
  }

  // Handle global keydown
  onKeyDown(event) {
    // Early escape if tile map isAnimating or input is invalid
    if (Stage.isAnimating() || !event?.key || !KEYS[event.key.toUpperCase()]) {
      return;
    }

    // Route key
    const key = `${event.key}`.toUpperCase();

    switch (key) {
      case KEY_BINDINGS[DIRECTIONS.UP]:
        playerY = setPlayerY(playerY - 1);
        Stage.pan(DIRECTIONS.UP, this.getSetAreaTiles);

        break;

        case KEY_BINDINGS[DIRECTIONS.LEFT]:
        playerX = setPlayerX(playerX - 1);
        Stage.pan(DIRECTIONS.LEFT, this.getSetAreaTiles);

        break;

      case KEY_BINDINGS[DIRECTIONS.DOWN]:
        playerY = setPlayerY(playerY + 1);
        Stage.pan(DIRECTIONS.DOWN, this.getSetAreaTiles);

        break;

      case KEY_BINDINGS[DIRECTIONS.RIGHT]:
        playerX = setPlayerX(playerX + 1);
        Stage.pan(DIRECTIONS.RIGHT, this.getSetAreaTiles);

        break;
      default:
        break;
    }
  }

  // Handle render
  onRender() {
    //
  }
}

const Player = new TileMap2DPlayer('#TileMap2DPlayer');
// register(Player);
