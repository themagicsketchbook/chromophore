// State variables
let [isJumping, setIsJumping] = useState(false);

/*
  SideMapPlayer
*/

class SideMapPlayer extends FixedCanvas2DPlayer {
  constructor(selector) {
    super(selector, 'div', `
      top: calc(50% - 96px) !important;
    `);

    this.onRender();
  }

  // Player jump
  jump() {
    console.log('Jump!');
  }

  // Handle keydown
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
      case KEY_BINDINGS.LEFT:
        stageX = setStageX(Math.max(0, stageX - 1));

        break;

      case KEY_BINDINGS.RIGHT:
        stageX = setStageX(
          Math.min(this.getLastX(), stageX + 1)
        );

        break;

      case KEY_BINDINGS.JUMP:
        this.jump();

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
}
