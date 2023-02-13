class Tooltip {
  static instance;
  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initialize () {
    this.initListeners();
  }

  render(html) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = html;

    document.body.append(this.element);
  }

  initListeners() {
    document.addEventListener('pointerover', this.listenerOver);
    document.addEventListener('pointerout', this.listenerOut);
  }

  listenerOver = (event) => {
    const element = event.target.closest('[data-tooltip]');

    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.listenerMove)
    }
  }

  listenerMove = (event) => {
    if (event.target.closest('[data-tooltip]')) {
      const shift = 10;
      const left = event.clientX + shift;
      const top = event.clientY + shift;

      const windowWidth = document.documentElement.clientWidth;
      const elemCoor = this.element.getBoundingClientRect();
      const elemRightBorder = event.clientX + elemCoor.width + 10;
      const right = event.clientX - elemCoor.width;

      if (elemRightBorder >= windowWidth) {
        this.element.style.left = `${right}px`;
      }

      if (elemRightBorder < windowWidth) {
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
      }
    }
  }

  listenerOut = (event) => {
    if (event.target.closest('[data-tooltip]')) {
      this.remove();
      document.removeEventListener('pointermove', this.listenerMove);
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
