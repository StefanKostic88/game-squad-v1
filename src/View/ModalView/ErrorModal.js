class ErrorModal {
  _parentEl = document.querySelector(".main-content");
  _inputEl = document.querySelector("input");
  _paginationEl = document.querySelector(".pagination");

  closeErrorHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const click = e.target.closest(".error-window");
      if (!click) return;
      const sectionBtn =
        e.target.closest(".error-window").children[1].dataset.close;
      handler(sectionBtn);
    });
  }
  renderError(data, dataType) {
    this.clearParentEl();
    this.disableInput();
    this.disablePagination();
    const html = `<div class="error-window">
 <p>${data}</p>
 <button data-close="${dataType}">Reload</button>
</div>`;
    return this._parentEl.insertAdjacentHTML("beforeend", html);
  }
  clearParentEl() {
    this._parentEl.innerHTML = "";
  }
  disableInput() {
    this._inputEl.setAttribute("disabled", "");
    this._inputEl.classList.add("prevent");
    console.log(this._inputEl);
  }
  unableInput() {
    this._inputEl.removeAttribute("disabled");
    this._inputEl.classList.remove("prevent");
    console.log(this._inputEl);
  }
  disablePagination() {
    this._paginationEl.classList.add("pagination-hiden");
  }
  unablePagination() {
    this._paginationEl.classList.remove("pagination-hiden");
  }
}
export default new ErrorModal();
