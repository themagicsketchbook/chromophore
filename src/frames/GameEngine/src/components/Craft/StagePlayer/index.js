// State variables
let [meshRotation, setMeshRotation] = useState([0, 0, 0]);
let [playerMesh, setPlayerMesh] = useState();
let [stageZ, setStageZ] = useState(0);
let [jumpY, setJumpY] = useState(0);

/*
  StagePlayer
*/

class StagePlayer extends FixedCanvas2DPlayer {
  constructor(selector) {
    super(selector);

    document.body.removeChild(this.element);
    this.element = renderer.domElement;

    playerMesh = setPlayerMesh(
      new THREE.Mesh(
        new THREE.BoxGeometry(.5, 1.5, .1),
        new THREE.MeshBasicMaterial({
          color: COLORS.GREEN,
          opacity: 0
        })
      )
    );

    stage.add(playerMesh);
  }

  jump() {
    jumpY = setJumpY(1);

    setTimeout(() => {
      jumpY = setJumpY(0);
    }, 200);
  }

  // Handle keydown
  onKeyDown(event) {
    // Early escape if tile map isAnimating or input is invalid
    if (!event?.code) {
      return;
    }

    const keyCode = event.code.toUpperCase().replace('KEY', '');

    // Early escape if jumping, moving, or input is invalid
    if (jumpY || isMoving || !KEYS[keyCode]) {
      return;
    }

    switch (keyCode) {
      case KEY_BINDINGS.UP:
        meshRotation = setMeshRotation([0, 0, 0]);
        stageZ = setStageZ(Math.max(-6, stageZ - .1));

        break;

      case KEY_BINDINGS.LEFT:
        meshRotation = setMeshRotation([0, 2, 0]);
        stageX = setStageX(Math.max(-6, stageX - .1));

        break;

      case KEY_BINDINGS.DOWN:
        meshRotation = setMeshRotation([0, -3, 0]);
        stageZ = setStageZ(Math.min(3.5, stageZ + .1));

        break;

      case KEY_BINDINGS.RIGHT:
        meshRotation = setMeshRotation([0, -2, 0]);
        stageX = setStageX(Math.min(6, stageX + .1));

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
    }, 17);
  }

  // Handle render
  onRender() {
    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;

    if (playerMesh.rotation.x < meshRotation[0]) {
      rotationX = playerMesh.rotation.x + .1;
    }

    if (playerMesh.rotation.x > meshRotation[0]) {
      rotationX = playerMesh.rotation.x - .1;
    }

    if (playerMesh.rotation.y < meshRotation[1]) {
      rotationY = playerMesh.rotation.y + .1;
    }

    if (playerMesh.rotation.y > meshRotation[1]) {
      rotationY = playerMesh.rotation.y - .1;
    }

    if (playerMesh.rotation.z < meshRotation[2]) {
      rotationZ = playerMesh.rotation.z + .1;
    }

    if (playerMesh.rotation.z > meshRotation[2]) {
      rotationZ = playerMesh.rotation.z - .1;
    }

    if (playerMesh.position.y < jumpY) {
      stageY = setStageY(Math.min(1, stageY + .1));
    }

    if (playerMesh.position.y > jumpY) {
      stageY = setStageY(Math.max(0, stageY - .1));
    }

    playerMesh.rotation.set(rotationX, rotationY, rotationZ);
    playerMesh.position.set(stageX, stageY, stageZ);
  }
}
