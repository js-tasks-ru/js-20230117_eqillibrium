export default class NotificationMessage {
  static notification;
  constructor (message = '', { duration = 0, type = '' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  show(target = document.body) {
    if (NotificationMessage.notification) {
      NotificationMessage.notification.remove();
    }

    target.append(this.element);

    this.timerID = setTimeout(() => {
      this.remove();
    }, this.duration);

    NotificationMessage.notification = this;
  }

  remove() {
    clearTimeout(this.timerID);

    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activeNotification = null;
  }
}
