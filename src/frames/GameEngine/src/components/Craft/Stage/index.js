// State variables
let [stage, setStage] = useState();
let [camera, setCamera] = useState();
let [renderer, setRenderer] = useState();

/*
  Stage
*/

class Stage extends FixedCanvas2D {
  constructor(selector) {
    super(selector, 'webgl');

    // Setup renderer
    renderer = setRenderer(
      new THREE.WebGLRenderer({ canvas })
    );

    renderer.setClearColor(0);
    renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

    // Setup stage
    stage = setStage(new THREE.Scene());

    // Setup camera
    camera = setCamera(
      new THREE.PerspectiveCamera(
        75,
        WINDOW_WIDTH / WINDOW_HEIGHT
      )
    );

    camera.position.z = 5;
    stage.add(camera);
  }

  // Handle render
  onRender() {
    renderer.render(stage, camera);

    if (Player) {
      Player.onRender();
    }
  }
}
