import CardView from "./CardView.js";

class GenreView extends CardView {
  //prettier-ignore
  _dataArr = ["Action", "Indie", "Adventure", "RPG", "Strategy", "Shooter", "Casual", "Simulation", "Puzzle", "Arcade", "Platformer", "Racing", "Massively Multiplayer", "Sports", "Fighting", "Family", "Board Games", "Educational", "Card" ];
  _parentEl = document.querySelector(".genre");

  selectGenreHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const click = e.target.closest(".sub-sidebar__link");
      if (!click) return;
      const genreValue = click.dataset.genre;
      handler(genreValue);
    });
  }
  paginationHandler(handler) {
    this._paginationEl.addEventListener("click", function (e) {
      console.log(e.target);
      const isValid = e.target.classList.contains("genre-games-btn");
      if (!isValid) return;
      const btnType = e.target.closest("a").dataset.page;
      const btnVal = e.target.closest("a").dataset.current;
      handler(btnType, btnVal);
    });
  }

  toggleListHandler() {
    this._parentEl.addEventListener("click", this._toggleList);
  }

  _toggleList(e) {
    e.preventDefault(e);
    document.querySelector(".sub-sidebar__nav").classList.toggle("hide");
  }
  render() {
    const html = this.generateMarkUp();
    this._parentEl.insertAdjacentHTML("beforeend", html);
  }

  generateMarkUp() {
    return `<ul class="sub-sidebar__nav hide">
    ${this._dataArr
      .map(
        (el) =>
          ` <li class="sub-sidebar__item" ">
        <a class="sub-sidebar__link" data-genre="${el}" href="${el}">
        ${el}</a>
      </li>`
      )
      .join("")}
  </ul>`;
  }
}

export default new GenreView();
