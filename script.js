document.getElementById("year")?.append(new Date().getFullYear());

const email = "Grant.quent@gmail.com";
const copyBtn = document.getElementById("copyEmail");

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Email";
    }, 1200);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => {
      copyBtn.textContent = "Copy Email";
    }, 1200);
  }
});

const themes = ["aurora", "cobalt", "orchid", "ember"];
const themeNames = {
  aurora: "Aurora",
  cobalt: "Cobalt",
  orchid: "Orchid",
  ember: "Ember"
};

const themeBtn = document.getElementById("themeBtn");
const modeBtn = document.getElementById("modeBtn");

const prefersDark =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

const savedTheme = localStorage.getItem("theme");
const savedMode = localStorage.getItem("mode");

if (savedTheme) document.body.dataset.theme = savedTheme;
if (savedMode) {
  document.body.dataset.mode = savedMode;
} else {
  document.body.dataset.mode =
    prefersDark && prefersDark.matches ? "dark" : "light";
}

function refreshControls() {
  const t = document.body.dataset.theme || "aurora";
  const m = document.body.dataset.mode || "dark";

  if (themeBtn) themeBtn.textContent = `Theme: ${themeNames[t] || "Aurora"}`;
  if (modeBtn) modeBtn.textContent = `Mode: ${m[0].toUpperCase()}${m.slice(1)}`;
}

themeBtn?.addEventListener("click", () => {
  const current = document.body.dataset.theme || "aurora";
  const next = themes[(themes.indexOf(current) + 1) % themes.length];
  document.body.dataset.theme = next;
  localStorage.setItem("theme", next);
  refreshControls();
});

modeBtn?.addEventListener("click", () => {
  const current = document.body.dataset.mode || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.body.dataset.mode = next;
  localStorage.setItem("mode", next);
  refreshControls();
});

prefersDark?.addEventListener?.("change", (e) => {
  const userSetMode = !!localStorage.getItem("mode");
  if (userSetMode) return;
  document.body.dataset.mode = e.matches ? "dark" : "light";
  refreshControls();
});

refreshControls();

const currentPage = document.body.dataset.page;
document.querySelectorAll("nav a").forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (
    (currentPage === "home" && href === "index.html") ||
    href.includes(`${currentPage}.html`)
  ) {
    link.classList.add("active");
  }
});