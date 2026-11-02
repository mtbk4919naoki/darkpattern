const tabName = (tab) => tab.dataset.tab;

function duplicateTabs(source) {
  const nav = document.querySelector(".case-nav");
  if (!nav || document.querySelector(".view-tabs--bottom")) return;

  const bottom = source.cloneNode(true);
  bottom.classList.add("view-tabs--bottom");
  bottom.setAttribute("aria-label", "表示切替（下部）");
  for (const node of bottom.querySelectorAll("[id]")) node.removeAttribute("id");
  nav.before(bottom);
}

function activate(name) {
  for (const tab of document.querySelectorAll(".view-tabs [role='tab']")) {
    const selected = tabName(tab) === name;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }

  for (const panel of document.querySelectorAll("[role='tabpanel']")) {
    panel.hidden = panel.id !== `panel-${name}`;
  }
}

function moveFocus(tablist, event) {
  const tabs = [...tablist.querySelectorAll("[role='tab']")];
  const current = tabs.indexOf(event.target);
  if (current < 0) return;

  const offset = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
  let next = current;
  if (offset) next = (current + offset + tabs.length) % tabs.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = tabs.length - 1;
  if (next === current) return;

  event.preventDefault();
  tabs[next].focus();
  tabs[next].click();
}

export function initTabs() {
  const source = document.querySelector(".view-tabs");
  if (!source) return;

  duplicateTabs(source);
  const names = [...source.querySelectorAll("[role='tab']")].map(tabName);

  for (const tab of document.querySelectorAll(".view-tabs [role='tab']")) {
    tab.addEventListener("click", () => {
      const name = tabName(tab);
      activate(name);
      if (location.hash !== `#${name}`) history.replaceState(null, "", `#${name}`);
    });
  }

  for (const tablist of document.querySelectorAll(".view-tabs")) {
    tablist.addEventListener("keydown", (event) => moveFocus(tablist, event));
  }

  const hash = location.hash.slice(1);
  activate(names.includes(hash) ? hash : names[0]);
}
