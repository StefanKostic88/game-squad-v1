import CardView from "./CardView.js";
import icons from "../../img/sprite.svg";
console.log(icons);
class PublisherCardView extends CardView {
  selectPublisherHandler(handler) {
    this._sidebarNavContainerEL.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".main-sidebar__list-item").dataset.select;
      if (btn !== "publishers") return;
      handler(btn);
    });
  }
  publisherPagination(handler) {
    this._paginationEl.addEventListener("click", function (e) {
      const isValid = e.target.classList.contains("publishers-games-btn");

      if (!isValid) return;
      const btnType = e.target.closest("a").dataset.page;
      const btnVal = e.target.closest("a").dataset.current;

      handler(btnType, btnVal);
    });
  }
  render(data) {
    this.clearParentEl();
    const html = this._generateMarkUp(data);
    return this._parentEl.insertAdjacentHTML("beforeend", html);
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
          <p class="card__text">Game count : ${el.overalGames}</p>
          <button>More</button>
        </div>
      </div>
      </figure> 
      `;
      })
      .join("");
  }
  _generateUpdateData(data) {
    return data
      .map((el) => {
        return `
        <figure class="card" data-id="${el.id}">
        <div class="card__img-container">
       
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
          <p class="card__text">Game count : ${el.overalGames}</p>
          <button>More</button>
        </div>
      </div>
      </figure> 
      `;
      })
      .join("");
  }
}

export default new PublisherCardView();
