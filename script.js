const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const codeBlock = button.closest(".code-block");
    const codeElement = codeBlock?.querySelector("code");
    if (!codeElement) return;

    try {
      await navigator.clipboard.writeText(codeElement.innerText);
      const previousText = button.textContent;
      button.textContent = "Copied!";
      button.disabled = true;
      showToast("Code copied to clipboard.");

      setTimeout(() => {
        button.textContent = previousText;
        button.disabled = false;
      }, 1400);
    } catch (error) {
      showToast("Copy failed. Please select and copy manually.");
    }
  });
});

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1700);
}
