// State variables
let [stageX, setStageX] = useState(0);
let [stageY, setStageY] = useState(0);
let [isMoving, setIsMoving] = useState(false);

/*
  FixedCanvas2DPlayer
*/

class FixedCanvas2DPlayer extends Component {
  constructor(selector) {
    super(selector);

    document.body.onkeydown = this.onKeyDown.bind(this);
    this.element.setAttribute('class', 'FixedCanvas2DPlayer');
  }

  getComputedInt(prop) {
    return (
      getComputedStyle(this.element)[prop].replace(/px/gi, '') << 0
    );
  }

  getLastX() {
    return (
      (canvas.width - this.getComputedInt('width')) /
      this.getComputedInt('width')
    );
  }

  getLastY() {
    return (
      (canvas.height - this.getComputedInt('height')) /
      this.getComputedInt('height')
    );
  }

  // Handle global keydown
  onKeyDown(event) {
    // Early escape if tile map isAnimating or input is invalid
    if (!event?.code) {
      return;
    }

    const keyCode = event.code.toUpperCase().replace('KEY', '');

    // Early escape if isMoving or input is invalid
    if (isMoving || !KEYS[keyCode]) {
      return;
    }

    switch (keyCode) {
      case KEY_BINDINGS.UP:
        stageY = setStageY(Math.max(0, stageY - 1));

        break;

      case KEY_BINDINGS.LEFT:
        stageX = setStageX(Math.max(0, stageX - 1));

        break;

      case KEY_BINDINGS.DOWN:
        stageY = setStageY(
          Math.min(this.getLastY(), stageY + 1)
        );

        break;

      case KEY_BINDINGS.RIGHT:
        stageX = setStageX(
          Math.min(this.getLastX(), stageX + 1)
        );

        break;

      default:
        break;
    }

    isMoving = setIsMoving(true);

    setTimeout(() => {
      isMoving = setIsMoving(false);
    }, 1000);

    this.onRender();
  }

  // Handle render
  onRender() {
    this.element
      .setAttribute(
        'style',
        `\
          left: ${stageX * this.getComputedInt('width')}px; \
          top: ${stageY * this.getComputedInt('height')}px; \
          width: ${canvas.width / 9}px; \
          height: ${canvas.height / 5}px;\
        `
      );
  }
}
