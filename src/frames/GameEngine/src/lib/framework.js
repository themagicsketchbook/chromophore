/*
  Component
*/

// State variables
let [element, setElement] = useState();

class Component extends Entity {
  constructor(selector, tagName, cssText) {
    super();

    // Validate method signatures
    if (!this?.onRender) {
      throw new Error('Component instances must implement a `onRender` method');
    }

    // Configure a new element
    this.selector = selector;
    tagName = tagName || 'div';

    const domElement = document.createElement(tagName);

    // Set element selector
    domElement.setAttribute(
      selector[0] === '#' ? 'id' : 'class',
      selector.split('').slice(1).join('')
    );

    // Add element to DOM
    document.body.insertBefore(
      domElement,
      document.body.firstChild
    );

    // Add scoped styles to DOM
    if (cssText) {
      const styles = document.createElement('style');

      styles.setAttribute('scoped', '');
      styles.innerHTML = (
        `${selector} {${cssText.replace(/\n\r/gi, '')}}`
      );

      document.body.insertBefore(
        styles,
        document.body.firstChild
      );
    }

    // Bind render method and reselect element
    this.onRender = this.onRender.bind(this);
    this.reselect();
  }

  // Set the element to the current DOM rendition
  reselect() {
    this.element = element = setElement(
      document.querySelector(this.selector)
    );
  }

  // Handle update
  onUpdate() {
    this.reselect();
    requestAnimationFrame(this.onRender);
  }
}
