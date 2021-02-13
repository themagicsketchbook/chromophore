const TILES = [
  'black',
  'green',
  'blue'
];

// State variables
let [animationFrame, setAnimationFrame] = useState(1);
let [canvas, setCanvas] = useState();
let [context, setContext] = useState();
let [tiles, setTiles] = useState([[]]);
let [xOffset, setXOffset] = useState(1);
let [yOffset, setYOffset] = useState(1);
let [frameRate, setFrameRate] = useState(1);
let [direction, setDirection] = useState(false);

/*
  TileMap2D
*/

const TileMap2D = createComponent(
  '#TileMap2D',
  {
    // Set tiles to render
    setTileData: function(tileData) {
      tiles = setTiles(tileData);
      direction = setDirection(false);
    },

    // Returns calculated tile size
    getTileSize: function() {
      return canvas.width / 9;
    },

    // Returns true if an animation is pending
    isAnimating: function() {
      return animationFrame > 1;
    },

    // Returns true if current direction is up or down
    isUpOrDown: function() {
      return direction === DIRECTIONS.UP || direction === DIRECTIONS.DOWN
    },

    // Pan in the specified direction
    pan: function(dir, callback) {
      direction = setDirection(dir);
      const offset = TILE_OFFSET[direction];

      if (animationFrame > Math.max(1, (frameRate - 1))) {
        animationFrame = setAnimationFrame(1);
        xOffset = setXOffset(1);
        yOffset = setXOffset(1);
        frameRate = setFrameRate(1);

        return callback();
      }

      animationFrame = setAnimationFrame(animationFrame + 1);
      xOffset = setXOffset(offset.xOffset);
      yOffset = setYOffset(offset.yOffset);
      frameRate = setFrameRate(SMOOTHNESS);

      setTimeout(() => this.pan(direction, callback), FPS_MS);
    },

    // Handle mount
    onMount: function() {
      canvas = setCanvas(this.element);
      context = setContext(canvas.getContext('2d'));
    },

    // Handle render
    onRender: function () {
      const tileSize = this.getTileSize();
      const tileSizeFraction = tileSize / frameRate * animationFrame;

      // Render each tile
      tiles.forEach((row, y) => {
        row.forEach((_, x) => {
          // Get tile color
          context.fillStyle = TILES[(
            tiles[y + yOffset]
              ? tiles[y + yOffset][x + xOffset]
              : tiles[y][x + xOffset]
            )
          ];

          // Fill tile
          context.fillRect(
            (x * tileSize) + (
              direction !== DIRECTIONS.RIGHT
                ? 0
                : tileSize - tileSizeFraction
            ),
            (y * tileSize) + (
              direction !== DIRECTIONS.DOWN
                ? 0
                : tileSize - tileSizeFraction
            ),
            (
              this.isUpOrDown()
                ? tileSize
                : tileSizeFraction
            ),
            (
              this.isUpOrDown()
                ? tileSizeFraction
                : tileSize
            )
          );
        })
      })
    }
  }
);

register(TileMap2D);
