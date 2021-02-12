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

    const reselect = () => {
      this.element = element = setElement(document.querySelector(selector));
    };

    super({
      ...methods,

      onUpdate: () => {
        reselect();
        requestAnimationFrame(this.onRender);
      }
    });

    reselect();

    requestAnimationFrame(() => {
      document.body.insertBefore(element, document.body.firstElementChild);
    });

    if (this.onMount) {
      this.onMount();
    }
  }
}
