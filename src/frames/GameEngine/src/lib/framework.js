/*
  Component
*/

// State variables
let [element, setElement] = useState();

class Component extends Entity {
  constructor(selector) {
    super();

    this.selector = selector;

    if (!this?.onRender) {
      throw new Error('Component instances must implement a `onRender` method');
    }

    this.onRender = this.onRender.bind(this);
    this.reselect();

    requestAnimationFrame(() => {
      document.body.insertBefore(element, document.body.firstElementChild);
    });
  }

  reselect() {
    this.element = element = setElement(document.querySelector(this.selector));
  }

  onUpdate() {
    this.reselect();
    requestAnimationFrame(this.onRender);
  }
}
