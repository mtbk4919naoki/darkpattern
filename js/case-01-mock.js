(function () {
  function bindMock(rootId) {
    var root = document.getElementById(rootId);
    if (!root) return;
    var status = root.querySelector(".mock-status");
    root.querySelectorAll("[data-mock-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var msg = btn.getAttribute("data-mock-action");
        if (status) {
          status.textContent = msg;
          status.classList.toggle("is-ok", btn.hasAttribute("data-mock-ok"));
        }
      });
    });
  }
  bindMock("mock-dark");
  bindMock("mock-good");
})();
