// Create a component instance
const createComponent = (selector, ...methods) => (
  new Component(selector, ...methods)
);

// Create a canvas element instance
const createCanvas = id => {
  const canvasElement = document.createElement('canvas');

  canvasElement.width = 1280;
  canvasElement.height = 720;
  canvasElement.setAttribute('width', canvasElement.width);
  canvasElement.setAttribute('height', canvasElement.height);
  canvasElement.setAttribute('id', id);

  return canvasElement;
};
