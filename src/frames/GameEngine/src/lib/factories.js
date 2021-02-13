// Create a canvas element instance
const createCanvas = id => {
  const canvasElement = document.createElement('canvas');

  canvasElement.width = WINDOW_WIDTH;
  canvasElement.height = WINDOW_HEIGHT;
  canvasElement.setAttribute('width', WINDOW_WIDTH_PX);
  canvasElement.setAttribute('height', WINDOW_HEIGHT_PX);
  canvasElement.setAttribute('id', id);

  return canvasElement;
};
