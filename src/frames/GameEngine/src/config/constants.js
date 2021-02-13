const ROOT_CONTEXT = 'Main';

const WINDOW_WIDTH = 1280;
const WINDOW_HEIGHT = 720;

const WINDOW_WIDTH_PX = `${WINDOW_WIDTH}px`;
const WINDOW_HEIGHT_PX = `${WINDOW_HEIGHT}px`;

const FPS = 60;
const FPS_MS = 1000 / FPS;
const SMOOTHNESS = 90;

const COLORS = {
  BLACK: 'black',
  GREEN: 'green',
  BLUE: 'blue',
  GRAY: 'gray'
};

const DIRECTIONS = {
  UP: 'UP',
  LEFT: 'LEFT',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT'
};

const TILE_OFFSET = {
  UP: {
    xOffset: 1,
    yOffset: 0
  },
  LEFT: {
    xOffset: 0,
    yOffset: 1
  },
  DOWN: {
    xOffset: 1,
    yOffset: 2
  },
  RIGHT: {
    xOffset: 2,
    yOffset: 1
  }
};

const KEYS = {
  W: 'W',
  A: 'A',
  S: 'S',
  D: 'D',
  SPACE: 'SPACE'
};

const KEY_BINDINGS = {
  UP: KEYS.W,
  LEFT: KEYS.A,
  DOWN: KEYS.S,
  RIGHT: KEYS.D,
  JUMP: KEYS.SPACE
};

try {
  module.exports = {
    ROOT_CONTEXT,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    WINDOW_WIDTH_PX,
    WINDOW_HEIGHT_PX,
    FPS,
    FPS_MS,
    COLORS,
    SMOOTHNESS,
    DIRECTIONS,
    TILE_OFFSET,
    KEYS,
    KEY_BINDINGS
  };
} catch(error) {
  console.warn('Skipping exports in a browser environment.');
}
