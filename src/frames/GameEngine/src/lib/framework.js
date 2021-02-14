/*
  Component
*/

// State variables
let [element, setElement] = useState();

class Component extends Entity {
  constructor(selector, tagName) {
    super();

    if (!this?.onRender) {
      throw new Error('Component instances must implement a `onRender` method');
    }

    this.selector = selector;

    if (tagName) {
      const domElement = document.createElement(tagName);

      domElement.setAttribute(
        selector[0] === '#' ? 'id' : 'class',
        selector.split('').slice(1).join('')
      );

      document.body.insertBefore(
        domElement,
        document.body.firstElementChild
      );
    }

    this.onRender = this.onRender.bind(this);
    this.reselect();
  }

  reselect() {
    this.element = element = setElement(
      document.querySelector(this.selector)
    );
  }

  onUpdate() {
    this.reselect();
    requestAnimationFrame(this.onRender);
  }
}
