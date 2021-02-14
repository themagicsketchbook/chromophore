// State variables
let [velocity, setVelocity] = useState(0);

/*
  SideMap
*/

class SideMap extends TileMap2D {
  constructor(selector) {
    super(selector);

    this.onRender();
  }

  // Pan the map quickly up then return to y origin
  jump() {
    console.log('Pan up and back down');
  }
}
