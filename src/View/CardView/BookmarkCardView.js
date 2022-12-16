import CardView from "./CardView.js";
import icons from "../../img/sprite.svg";

class BookmarkCardView extends CardView {
  selectBookmarkHandler(handler) {
    this._sidebarNavContainerEL.addEventListener("click", function (e) {
      const btn = e.target.closest(".main-sidebar__list-item").dataset.select;
      if (btn !== "bookmarks") return;
      handler(btn);
    });
  }
  bookmarkPaginationHandler(handler) {
    this._paginationEl.addEventListener("click", function (e) {
      const isValid = e.target.classList.contains("bookmark-games-btn");
      if (!isValid) return;

      const btnType = e.target.closest("a").dataset.page;
      const btnVal = e.target.closest("a").dataset.current;
      handler(btnType, btnVal);
    });
  }
  _generateMarkUp(data) {
    return data
      .map((el) => {
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
            src="${el.img}"
          />
        </div>
        <div class="card__content">
          <h3 class="card__heading">${el.title}</h3>
          <div class="card__content-wraper">
            <p class="card__text">${
              el.playtime === null ? "Play Time" : "Overal Games"
            } : ${
          el.playtime || el.overalGames || el.playtime || "not available"
        } ${el.playtime ? "Hours" : ""}</p>
            <button class="modal-btn" data-id="${el.id}">More</button>
          </div>
        </div>
        </figure>
        `;
      })
      .join("");
  }
}

export default new BookmarkCardView();
