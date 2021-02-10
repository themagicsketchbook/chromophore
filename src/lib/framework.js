/*
  State diff & updater
*/

let __update, __previousState;
const __state = [];

const __createUpdater = context => (
  () => context.onUpdate()
);

const __handleUpdate = () => {
  if (!__update) {
    throw new Error('App not registered.');
  }

  const isStateChanged = (
    __previousState?.join('') !== __state.join('')
  );

  if (isStateChanged) {
    __update();
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
  registerFrame to provide context to the updater
*/

let __updaterId = -1;

const registerFrame = context => {
  __update = __createUpdater(context);

  // Update state changes at ~30 FPS
  __updaterId = setInterval(() => __handleUpdate(), 33);

  return context.onUpdate();
};

/*
  unregisterFrame to pause the update loop
*/

const unregisterFrame = context => {
  __update = __createUpdater(context);

  // Clear the update interval
  clearInterval(__updaterId);

  return { __updaterId };
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
  Frame
*/

const { NativeWindow } = require('./electron');

class Frame extends Entity {
  constructor(methods) {
    if (!methods?.onStart) {
      throw new Error('Frame instance must implement a `onStart` method');
    }

    if (!methods?.onUpdate) {
      throw new Error('Frame instance must implement an `onUpdate` method');
    }

    super(methods);

    NativeWindow.whenReady().then(() => {
      this.onStart();

      NativeWindow.on('window-all-closed', this.onWindowAllClosed);
      NativeWindow.on('activate', this.onActivate);
    });
  }

  // Handle window activated
  onActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      registerFrame();
      this.onStart();
    }
  }

  // Handle window closed
  onWindowAllClosed() {
    unregisterFrame();
    NativeWindow.quit();
  }
}

module.exports = {
  useState,
  registerFrame,
  unregisterFrame,
  Entity,
  Frame
};
