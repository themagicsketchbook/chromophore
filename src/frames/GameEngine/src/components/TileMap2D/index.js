// State variables
let [canvas, setCanvas] = useState();
let [tiles, setTiles] = useState([[]]);

const TileMap2D = createComponent(
  '#TileMap2D',
  {
    onRender: function () {
      console.log('onRender', this.element);
    }
  }
);

mountComponent(TileMap2D);
