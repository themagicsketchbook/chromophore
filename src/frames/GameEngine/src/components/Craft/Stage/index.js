// State variables
let [stage, setStage] = useState();
let [camera, setCamera] = useState();
let [renderer, setRenderer] = useState();
let [mesh, setMesh] = useState();
let [meshRotation, setMeshRotation] = useState([0, 0, 0]);

/*
  Stage
*/

class Stage extends FixedCanvas2D {
  constructor(selector) {
    super(selector, 'webgl');

    this.setupRenderer();
    this.setupThreeScene();
    this.setupCamera();
    this.setupMesh();
  }

  // Instantiate camera
  setupCamera() {
    camera = setCamera(
      new THREE.PerspectiveCamera(
        75,
        WINDOW_WIDTH / WINDOW_HEIGHT
      )
    );

    camera.position.z = 5;
    stage.add(camera);
  }

  // Instantiate renderer
  setupRenderer() {
    renderer = setRenderer(
      new THREE.WebGLRenderer({ canvas })
    );

    renderer.setClearColor(0);
    renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
  }

  // Instantiate THREE.Scene
  setupThreeScene() {
    stage = setStage(new THREE.Scene());
  }

  // Create & add the 3D stage object
  setupMesh() {
    mesh = setMesh(
      new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: COLORS.GREEN })
      )
    );

    stage.add(mesh);
  }

  // Handle render
  onRender() {
    renderer.render(stage, camera);

    meshRotation = setMeshRotation([
      meshRotation[0] + 0.0,
      meshRotation[1] + 0.01,
      meshRotation[2] + 0.0
    ]);

    mesh.rotation.set(...meshRotation);
    mesh.position.set(0, 0, 3);

    if (Player) {
      Player.onRender();
    }
  }
}
