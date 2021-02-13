// State variables
let [xOffset, setXOffset] = useState(1);
let [yOffset, setYOffset] = useState(1);
let [frameRate, setFrameRate] = useState(1);
let [animationFrame, setAnimationFrame] = useState(1);
let [direction, setDirection] = useState(false);

/*
  MapScroll
*/

class MapScroll extends TileMap2D {
  // Set tiles to render
  setTileData(tileData) {
    tiles = setTiles(tileData);
    direction = setDirection(false);
  }

  // Returns true if animation is pending
  isAnimating() {
    return animationFrame > 1;
  }

  // Returns true if current direction is up or down
  isUpOrDown() {
    return direction === DIRECTIONS.UP || direction === DIRECTIONS.DOWN
  }

  // Pan in the specified direction
  pan(dir, callback) {
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
  }

  // Handle render
  onRender() {
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
