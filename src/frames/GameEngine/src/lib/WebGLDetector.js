/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 * @author exactchange / http://github.com/exactchange
 **/

(() => {
  const noSupportBrowserText = 'Your browser does not support WebGL.';
  const noSupportGfxText = 'Your graphics card does not support WebGL.';
  const noSupportHelpText = 'Learn how to enable WebGL in your browser: http://get.webgl.org';

  const noSupportBrowser = [noSupportBrowserText, noSupportHelpText].join('\n');
  const noSupportGfx = [noSupportGfxText, noSupportHelpText].join('\n');

  const element = document.createElement('div');

  element.style.background = '#fff';
  element.style.color = '#000';
  element.style.fontFamily = 'monospace';
  element.style.fontSize = '13px';
  element.style.fontWeight = 'normal';
  element.style.margin = '5em auto 0';
  element.style.padding = '1.5em';
  element.style.textAlign = 'center';
  element.style.width = '400px';

  class WebGLDetector {
    constructor() {
      this.support = {
        canvas2D: Boolean(window.CanvasRenderingContext2D),
        fileApi: Boolean(window.File && window.FileReader && window.FileList && window.Blob)
      };

      this.alert.call(this);
    }

    get isWebGLEnabled() {
      try {
        const _canvas = document.createElement('canvas');

        return Boolean(window.WebGLRenderingContext && (_canvas.getContext('webgl') || _canvas.getContext('experimental-webgl')));
      } catch(e) {
        return false;
      }
    }

    alert(props = {}) {
      const { isWebGLEnabled } = this;
      const parent = props.parent !== undefined ? props.parent : document.body;
      const id = props.id !== undefined ? props.id : 'oldie';

      if (!isWebGLEnabled) {
        element.id = id;
        element.innerHTML = window.WebGLRenderingContext ? noSupportBrowser : noSupportGfx;
        parent.appendChild(element);
      }

      return element;
    }
  }

  window.WebGLDetector = WebGLDetector;
})();
