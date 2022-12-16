import CardView from "./CardView.js";
import icons from "../../img/sprite.svg";
console.log(icons);

class GameSearchView extends CardView {
  _formEl = document.querySelector("form");
  searchGameHandler(handler) {
    this._formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const submit = e.target.children[0];
      handler(submit.value);

      submit.value = "";
    });
  }
  searchPagination(handler) {
    this._paginationEl.addEventListener("click", function (e) {
      const isValid = e.target.classList.contains("search-games-btn");
      if (!isValid) return;
      const btnType = e.target.closest("a").dataset.page;
      const btnVal = e.target.closest("a").dataset.current;
      handler(btnType, btnVal);
    });
  }

  _generateMarkUp(data) {
    console.log(data[0]);
    return data
      .map((el) => {
        // const tag = el.playtime === 0 ? "Game Count" : "Play Time";
        const tagTwo =
          el.playtime === 0 || el.playtime === null
            ? "Not Available"
            : el.playtime;
        // console.log(tag);
        // https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1600
        // console.log(
        //   el.img === null
        //     ? "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1600"
        //     : el.img
        // );
        return `
        <figure class="card" data-id="${el.id}">
        <div class="card__img-container">
        <div class="main-content__spiner ">
            <div class="preloader-spiner">
              <span class="preloader-text">loading...</span>
            </div>
          </div>
        <span class='card__bookmark ${
          el.bookmarked ? "booked " : ""
        }'><svg class="settings__icon">
        <use xlink:href="${icons}#icon-bookmarks"></use></svg></span>
          <img
            src="${
              el.img === null
                ? "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1600"
                : el.img
            }"
          />
        </div>
        <div class="card__content">
          <h3 class="card__heading">${el.title}</h3>
          <div class="card__content-wraper">
            <p class="card__text">Play Time: ${tagTwo} ${
          el.playtime ? "hours" : ""
        }</p>
            <button data-id="${el.id}">More</button>
          </div>
        </div>
        </figure>
        `;
      })
      .join("");
  }
  _generateUpdate(data) {
    console.log(data[0]);
    return data
      .map((el) => {
        const tagTwo =
          el.playtime === 0 || el.playtime === null || el.overalGames === null
            ? "Not Available"
            : el.playtime;

        return `
        <figure class="card" data-id="${el.id}">
        <div class="card__img-container">
       
        <span class='card__bookmark ${
          el.bookmarked ? "booked " : ""
        }'><svg class="settings__icon">
        <use xlink:href="${icons}#icon-bookmarks"></use></svg></span>
          <img
            src="${
              el.img === null
                ? "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1600"
                : el.img
            }"
          />
        </div>
        <div class="card__content">
          <h3 class="card__heading">${el.title}</h3>
          <div class="card__content-wraper">
            <p class="card__text">Play Time: ${tagTwo} ${
          el.playtime ? "hours" : ""
        }</p>
            <button data-id="${el.id}">More</button>
          </div>
        </div>
        </figure>
        `;
      })
      .join("");
  }
  update(data) {
    this.clearParentEl();
    const html = this._generateUpdate(data);

    return this._parentEl.insertAdjacentHTML("beforeend", html);
  }
}

export default new GameSearchView();
