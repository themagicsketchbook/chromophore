// State variables
let [canvas, setCanvas] = useState();
let [context, setContext] = useState();

/*
  FixedCanvas2D
*/

class FixedCanvas2D extends Component {
  constructor(selector) {
    super(selector);

    canvas = setCanvas(this.element);
    context = setContext(canvas.getContext('2d'));
  }

  // Handle render
  onRender() {
    // Set color
    context.fillStyle = COLORS.GRAY;

    // Fill canvas
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (Player) {
      Player.onRender();
    }
  }
}
