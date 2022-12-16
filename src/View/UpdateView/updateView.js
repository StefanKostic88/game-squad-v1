class updateView {
  updateHandler(handler) {
    window.addEventListener("click", function (e) {
      const clicked = e.target.closest(".card__bookmark");
      if (!clicked) return;

      const id = +clicked.closest(".card").dataset.id;
      const type = this.document.querySelector(".main-content").dataset.type;

      handler(id, type);
    });
  }
}

export default new updateView();
