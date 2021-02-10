/*
  State diff & renderer
*/

let __render, __previousState;
const __state = [];

const __createRenderer = context => (
  () => context.onUpdate()
);

const __handleRender = () => {
  if (!__render) {
    throw new Error('App not registered.');
  }

  const isStateChanged = (
    __previousState?.join('') !== __state.join('')
  );

  if (isStateChanged) {
    __render();
    __previousState = [...__state];
  }
};

/*
  useState to manage state variables
*/

const useState = initialValue => {

  // Generate unique ID
  const id = __state.length;

  // Update state value
  const updateValue = newValue => {

    // Update value
    __state[id] = newValue;

    // Return new value
    return newValue;
  };

  // Set initial value
  __state.push(initialValue);

  // Return dependency array
  return [__state[id], updateValue];
};

/*
  mountComponent to provide context to the renderer
*/

let __rendererId = -1;

const mountComponent = context => {
  __render = __createRenderer(context);

  // Render state changes at ~30 FPS
  __rendererId = setInterval(() => __handleRender(), 33);

  return context.onUpdate();
};

/*
  unmountComponent to pause the render loop
*/

const unmountComponent = context => {
  __render = __createRenderer(context);

  // Clear the render interval
  clearInterval(__rendererId);

  return { __rendererId };
};

/*
  Entity
*/

class Entity {
  constructor(methods) {
    if (!methods?.onUpdate) {
      throw new Error('Entity instances must implement a `onUpdate` method');
    }

    for (const method in methods) {
      if (typeof(methods[method]) === 'function') {
        this[method] = methods[method].bind(this);
      }
      else {
        console.warn(
          'Only methods can be passed to Entity instances. Use `useState` for state variables.'
        );
      }
    }
  }
}

/*
  Component
*/

// State variables
let [element, setElement] = useState();

class Component extends Entity {
  constructor(selector, methods) {
    if (!methods?.onRender) {
      throw new Error('Component instances must implement a `onRender` method');
    }

    super({
      ...methods,

      onUpdate: () => {
        element = setElement(document.querySelector(selector));
        this.element = element;
        this.onRender();
      }
    });

    element = setElement(document.querySelector(selector));

    requestAnimationFrame(() => {
      document.body.insertBefore(element, document.body.firstElementChild);
    });
  }
}
