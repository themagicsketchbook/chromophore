// State variables
let [stageX, setStageX] = useState(10);
let [stageY, setStageY] = useState(10);

/*
  FixedStage2DPlayer
*/

class FixedStage2DPlayer extends Component {
  // Handle mount
  onMount() {
    document.body.onkeydown = this.onKeyDown.bind(this);
  }

  // Handle global keydown
  onKeyDown(event) {
    // Early escape if input is invalid
    if (!event?.key || !KEYS[event.key.toUpperCase()]) {
      return;
    }

    // Route key
    const key = `${event.key}`.toUpperCase();

    switch (key) {
      default:
        break;
    }
  }

  // Handle render
  onRender() {

  }
}
