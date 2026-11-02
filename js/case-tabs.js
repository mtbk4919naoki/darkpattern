(function () {
  var tablists = document.querySelectorAll(".view-tabs");
  if (!tablists.length) return;

  function tabName(tab) {
    return tab.getAttribute("data-tab") || tab.id.replace(/^tab-/, "");
  }

  function allTabs() {
    return document.querySelectorAll(".view-tabs [role='tab']");
  }

  function activate(name) {
    allTabs().forEach(function (tab) {
      var selected = tabName(tab) === name;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.setAttribute("tabindex", selected ? "0" : "-1");
    });
    document.querySelectorAll('[role="tabpanel"]').forEach(function (panel) {
      if (panel.id === "panel-" + name) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
  }

  allTabs().forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tabName(tab);
      activate(name);
      if (location.hash !== "#" + name) {
        history.replaceState(null, "", "#" + name);
      }
    });
  });

  tablists.forEach(function (tablist) {
    var localTabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    tablist.addEventListener("keydown", function (event) {
      var current = localTabs.indexOf(event.target);
      if (current < 0) return;

      var next = current;
      if (event.key === "ArrowRight") next = (current + 1) % localTabs.length;
      if (event.key === "ArrowLeft") next = (current - 1 + localTabs.length) % localTabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = localTabs.length - 1;
      if (next === current && !["Home", "End"].includes(event.key)) return;

      event.preventDefault();
      localTabs[next].focus();
      localTabs[next].click();
    });
  });

  var names = [];
  tablists[0].querySelectorAll('[role="tab"]').forEach(function (tab) {
    names.push(tabName(tab));
  });
  var hash = location.hash.replace("#", "");
  var initial = names.indexOf(hash) >= 0 ? hash : names[0];
  activate(initial);
})();
