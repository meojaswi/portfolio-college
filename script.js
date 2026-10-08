// Highlight current page in nav
const here = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a").forEach((a) => {
  if (a.getAttribute("href") === here) {
    a.classList.add("active");
    a.setAttribute("aria-current", "page");
  }
});
// Print / save as PDF
document
  .querySelectorAll("[data-print]")
  .forEach((b) => b.addEventListener("click", () => window.print()));
// Terminal intro: types the commands once on load
const term = document.querySelector("[data-terminal]");
if (term && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const items = [...term.querySelectorAll(".line")].map((el) => {
    const typed = el.querySelector(".typed");
    const text = typed ? typed.textContent : "";
    if (typed) typed.textContent = "";
    el.style.visibility = "hidden";
    return { el, typed, text };
  });
  (async () => {
    await sleep(400);
    for (const i of items) {
      i.el.style.visibility = "visible";
      if (i.typed) {
        for (const ch of i.text) {
          i.typed.textContent += ch;
          await sleep(55);
        }
        await sleep(280);
      } else await sleep(200);
    }
  })();
}
// Contact form validation
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((f) => {
      const err = f.nextElementSibling;
      let msg = "";
      if (!f.value.trim()) msg = "This field is required.";
      else if (
        f.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)
      )
        msg = "Enter a valid email address.";
      err.textContent = msg;
      if (msg) ok = false;
    });
    if (ok) {
      document.getElementById("form-status").textContent =
        "Thanks! Your message has been noted.";
      form.reset();
    }
  });
}
