const TILES = [
  'black',
  'green',
  'blue'
];

// State variables
let [canvas, setCanvas] = useState();
let [context, setContext] = useState();
let [tiles, setTiles] = useState([[]]);

/*
  TileMap2D
*/

class TileMap2D extends Component {
  // Set tiles to render
  setTileData(tileData) {
    tiles = setTiles(tileData);
  }

  // Returns calculated tile size
  getTileSize() {
    return canvas.width / 9;
  }

  // Handle mount
  onMount() {
    canvas = setCanvas(this.element);
    context = setContext(canvas.getContext('2d'));
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
