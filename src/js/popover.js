export default class Popover {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  renderItem() {
    return `<div class="popover">
        <div class="popover-content">
        <h1 class="popover-title">${this.title}</h1>
        <div class="popover-value">${this.content}</div>
        </div>
        <div class="arrow"></div>
      </div>`;
  }

  showTooltip(element) {
    const popoverEl = this.renderItem();
    const popover = document.querySelector(".popover");

    if (popover === null) {
      element.insertAdjacentHTML("beforebegin", popoverEl);
    } else {
      popover.remove();
    }
  }
}
