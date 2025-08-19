import Popover from "./popover";

const btn = document.querySelector(".btn");
const popover = new Popover(btn.title, btn.dataset.content);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  popover.showTooltip(btn);
});
