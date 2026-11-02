(function () {
  function windowFor(element) {
    return element.closest(".demo-window");
  }

  function feedbackFor(element) {
    var root = windowFor(element);
    return root ? root.querySelector(".demo-feedback") : null;
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest(
      "[data-demo-message], [data-demo-reveal], [data-demo-step], [data-demo-toggle]"
    );
    if (!trigger) return;

    var feedback = feedbackFor(trigger);
    var message = trigger.getAttribute("data-demo-message");
    if (feedback && message) {
      feedback.textContent = message;
      feedback.className =
        "demo-feedback demo-feedback--" +
        (trigger.getAttribute("data-demo-tone") || "neutral");
    }

    var revealId = trigger.getAttribute("data-demo-reveal");
    if (revealId) {
      var revealed = document.getElementById(revealId);
      if (revealed) revealed.hidden = false;
    }

    var toggleId = trigger.getAttribute("data-demo-toggle");
    if (toggleId) {
      var toggled = document.getElementById(toggleId);
      if (toggled) toggled.hidden = !toggled.hidden;
    }

    var stepId = trigger.getAttribute("data-demo-step");
    if (stepId) {
      var root = windowFor(trigger);
      if (!root) return;
      root.querySelectorAll(".demo-step").forEach(function (step) {
        step.hidden = step.id !== stepId;
      });
    }
  });

  document.querySelectorAll("[data-demo-countdown]").forEach(function (timer) {
    var initial = Number(timer.getAttribute("data-demo-countdown")) || 10;
    var remaining = initial;

    function render() {
      var minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
      var seconds = String(remaining % 60).padStart(2, "0");
      timer.textContent = minutes + ":" + seconds;
    }

    render();
    window.setInterval(function () {
      remaining -= 1;
      if (remaining < 0) {
        remaining = timer.hasAttribute("data-demo-reset") ? initial : 0;
      }
      render();
    }, 1000);
  });
})();
