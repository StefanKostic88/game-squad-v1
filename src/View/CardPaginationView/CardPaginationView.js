class CardPaginationView {
  _parentEl = document.querySelector(".main-wraper").children[2];
  renderPag(...data) {
    const [
      prevHundred,
      prevTen,
      prev,
      cur,
      next,
      nextTen,
      nextHundred,
      btnClass,
    ] = data;

    // console.log(btnClass);
    this.clearParentEl();

    const html = `<a class="prev ${btnClass} ${
      prev === null || prev === 0 ? "disabled" : ""
    }" data-page="prev" data-current="${prev}" href="#top">Prev</a>
    <a class="next ${btnClass}  ${
      prevHundred === null || cur === 1 || cur === 2 ? "remove" : ""
    }" data-page="prev-100" data-current="${
      prevHundred <= 0 ? 1 : prevHundred
    }" href="#top">${prevHundred <= 0 ? 1 : prevHundred}</a>
    <a class="next ${btnClass} ${
      prevTen <= 0 || prevTen === null ? "remove" : ""
    } " data-page="prev-10" data-current="${prevTen}" href="#top">${prevTen}</a>
    <a class="prev ${btnClass} ${
      prev === null || prev === 0 ? "disabled" : ""
    }" data-page="prev" data-current="${prev}" href="#top">${
      prev <= 0 || prevHundred === null ? "--" : prev
    }</a>
    <a class="prev ${btnClass} selected" data-page="cur" data-current="${cur}" href="#top">${cur}</a>
    <a class="next ${btnClass} ${
      next === null ? "disabled" : ""
    }" data-page="next" data-current="${next}" href="#top">${
      nextHundred === null || nextTen === null ? "--" : next
    }</a>
    <a class="next ${btnClass} ${
      nextTen === null ? "remove" : ""
    }" data-page="next-10" data-current="${nextTen}" href="#top">${nextTen}</a>
    <a class="next ${btnClass}  ${
      nextHundred === null ? "remove" : ""
    }" data-page="next-100" data-current="${nextHundred}" href="#top">${nextHundred}</a>
     <a class="next ${btnClass} ${
      next === null ? "disabled" : ""
    }" data-page="next" data-current="${next}" href="#top">Next</a>`;

    this._parentEl.insertAdjacentHTML("beforeend", html);
  }
  clearParentEl() {
    this._parentEl.innerHTML = "";
  }
}

export default new CardPaginationView();
