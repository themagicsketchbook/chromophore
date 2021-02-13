const TILES = [
  COLORS.BLACK,
  COLORS.GREEN,
  COLORS.BLUE
];

// State variables
let [tiles, setTiles] = useState([[]]);

/*
  TileMap2D
*/

class TileMap2D extends FixedCanvas2D {
  // Set tiles to render
  setTileData(tileData) {
    tiles = setTiles(tileData);
  }

  // Returns calculated tile size
  getTileSize() {
    return canvas.width / 9;
  }

  // Handle render
  onRender() {
    const tileSize = this.getTileSize();

    // Render each tile
    tiles.forEach((row, y) => {
      row.forEach((_, x) => {
        // Get tile color
        context.fillStyle = TILES[tiles[y][x]];

        // Fill tile
        context.fillRect(
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      })
    })
  }
}
