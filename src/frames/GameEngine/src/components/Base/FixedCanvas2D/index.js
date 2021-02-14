// State variables
let [canvas, setCanvas] = useState();
let [context, setContext] = useState();

/*
  FixedCanvas2D
*/

class FixedCanvas2D extends Component {
  constructor(selector, engine) {
    super(selector, 'canvas');

    this.element.setAttribute('width', WINDOW_WIDTH_PX);
    this.element.setAttribute('height', WINDOW_HEIGHT_PX);

    canvas = setCanvas(this.element);
    context = setContext(canvas.getContext(engine || '2d'));
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
