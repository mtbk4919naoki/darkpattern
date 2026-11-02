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
      tab.setAttribute("aria-selected", tabName(tab) === name ? "true" : "false");
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

  var names = [];
  tablists[0].querySelectorAll('[role="tab"]').forEach(function (tab) {
    names.push(tabName(tab));
  });
  var hash = location.hash.replace("#", "");
  var initial = names.indexOf(hash) >= 0 ? hash : names[0];
  activate(initial);
})();
