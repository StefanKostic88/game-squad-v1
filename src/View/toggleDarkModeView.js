class toggleDarkModeView {
  toggleHandler() {
    window.addEventListener("click", function (e) {
      const isValid = e.target.closest(".dark-mode-btn");
      if (!isValid) return;
      this.document.querySelector("body").classList.toggle("dark-toggle");
      this.document
        .querySelectorAll(".main-sidebar__sub-heading__icon")
        .forEach((el) => {
          console.log(el.children[0].classList);
          el.children[0].classList.toggle("dark-mode-icon");
        });
      [...this.document.getElementById("footer-icons").children].forEach(
        (el) => {
          el.children[0].children[1].classList.toggle("dark-mode-icon");
        }
      );
    });
  }
}

export default new toggleDarkModeView();
