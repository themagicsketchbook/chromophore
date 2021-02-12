// State variables
let [playerX, setPlayerX] = useState(10);
let [playerY, setPlayerY] = useState(10);

/*
  TileMapPlayer
*/

const TileMapPlayer = createComponent(
  '#TileMapPlayer',
  {
    // Fetch tiles from the API & update tile map
    getSetAreaTiles: function() {
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

      TileMap2D.setTileData(response.data);
    },

    // Handle mount
    onMount: function() {
      document.body.onkeydown = this.onKeyDown.bind(this);
      this.getSetAreaTiles();
    },

    // Handle global keydown
    onKeyDown: function(event) {
      // Early escape if tile map isAnimating or input is invalid
      if (TileMap2D.isAnimating() || !event?.key || !KEYS[event.key.toUpperCase()]) {
        return;
      }

      // Route key
      const key = `${event.key}`.toUpperCase();

      switch (key) {
        case KEY_BINDINGS[DIRECTIONS.UP]:
          playerY = setPlayerY(playerY - 1);
          TileMap2D.pan(DIRECTIONS.UP, this.getSetAreaTiles);

          break;

          case KEY_BINDINGS[DIRECTIONS.LEFT]:
          playerX = setPlayerX(playerX - 1);
          TileMap2D.pan(DIRECTIONS.LEFT, this.getSetAreaTiles);

          break;

        case KEY_BINDINGS[DIRECTIONS.DOWN]:
          playerY = setPlayerY(playerY + 1);
          TileMap2D.pan(DIRECTIONS.DOWN, this.getSetAreaTiles);

          break;

        case KEY_BINDINGS[DIRECTIONS.RIGHT]:
          playerX = setPlayerX(playerX + 1);
          TileMap2D.pan(DIRECTIONS.RIGHT, this.getSetAreaTiles);

          break;
        default:
          break;
      }
    },

    // Handle render
    onRender: function () {
      //
    }
  }
);
