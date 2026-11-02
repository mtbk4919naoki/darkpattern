(function () {
  var sidebar = document.querySelector(".site-sidebar");
  var toggle = document.querySelector(".sidebar-toggle");
  if (!sidebar || !toggle) return;

  toggle.addEventListener("click", function () {
    var open = sidebar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();
