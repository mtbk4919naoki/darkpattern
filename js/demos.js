const triggerSelector = [
  "[data-demo-message]",
  "[data-demo-reveal]",
  "[data-demo-step]",
  "[data-demo-toggle]",
  "[data-mock-action]",
].join(",");

const showFeedback = (trigger) => {
  const root = trigger.closest(".demo-window, .mock-browser");
  const feedback = root?.querySelector(".demo-feedback, .mock-status");
  const message = trigger.dataset.demoMessage ?? trigger.dataset.mockAction;
  if (!feedback || !message) return;

  feedback.textContent = message;
  if (feedback.classList.contains("mock-status")) {
    feedback.classList.toggle("is-ok", trigger.hasAttribute("data-mock-ok"));
    return;
  }

  feedback.className = `demo-feedback demo-feedback--${trigger.dataset.demoTone ?? "neutral"}`;
};

const reveal = (id) => {
  const target = document.getElementById(id);
  if (target) target.hidden = false;
};

const toggle = (id) => {
  const target = document.getElementById(id);
  if (target) target.hidden = !target.hidden;
};

const selectPlan = (trigger) => {
  if (!trigger.hasAttribute("data-demo-select")) return;
  const plan = trigger.closest(".demo-plan");
  const group = trigger.closest(".demo-plans");
  if (!plan || !group) return;

  for (const item of group.querySelectorAll(".demo-plan")) {
    const selected = item === plan;
    item.classList.toggle("is-selected", selected);
    const button = item.querySelector("[data-demo-select]");
    if (button) button.textContent = selected ? "選択中" : "選択";
  }
};

const showStep = (trigger, id) => {
  const root = trigger.closest(".demo-window");
  if (!root) return;
  for (const step of root.querySelectorAll(".demo-step")) {
    step.hidden = step.id !== id;
  }
};

const formatTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
};

const startCountdown = (timer) => {
  const initial = Number(timer.dataset.demoCountdown) || 10;
  let remaining = initial;
  const render = () => {
    timer.textContent = formatTime(remaining);
  };

  render();
  window.setInterval(() => {
    remaining -= 1;
    if (remaining < 0) remaining = timer.hasAttribute("data-demo-reset") ? initial : 0;
    render();
  }, 1000);
};

export function initDemos() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(triggerSelector);
    if (!trigger) return;

    showFeedback(trigger);
    selectPlan(trigger);
    if (trigger.dataset.demoReveal) reveal(trigger.dataset.demoReveal);
    if (trigger.dataset.demoToggle) toggle(trigger.dataset.demoToggle);
    if (trigger.dataset.demoStep) showStep(trigger, trigger.dataset.demoStep);
  });

  for (const timer of document.querySelectorAll("[data-demo-countdown]")) {
    startCountdown(timer);
  }
}
