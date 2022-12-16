import icons from "../../img/sprite.svg";
console.log(icons);
class CardView {
  _parentEl = document.querySelector(".main-content");
  _paginationEl = document.querySelector(".pagination");
  _sidebarNavContainerEL = document.querySelector(".main-sidebar__nav");
  _paginationBtnPrev = document.querySelector(".prev");
  _paginationBtnNext = document.querySelector(".next");

  loadCardHandler() {
    // document.querySelectorAll(".card").forEach((el) => {
    //   const cardImg = el.children[0].children[2];
    //   const spinerClassEl = el.children[0].children[0];
    //   cardImg.addEventListener("load", function () {
    //     spinerClassEl.classList.add("main-content__spiner-hide");
    //   });
    // });

    const cardObserver = new IntersectionObserver(
      (entries) => {
        const entry = [...entries];
        entry.forEach((el) => {
          if (el.isIntersecting) {
            el.target.children[0].children[0].style.display = "none";
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    const cardLIstEl = document.querySelectorAll(".card");
    cardLIstEl.forEach((el) => {
      cardObserver.observe(el);
    });
  }

  bookMarkHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const bookmark = e.target.closest(".card__bookmark");

      if (!bookmark) return;
      const id = +bookmark.closest(".card").dataset.id;
      handler({ bookmark, id });
    });
  }

  update(data) {
    this.clearParentEl();
    const html = this._generateUpdateData(data);

    return this._parentEl.insertAdjacentHTML("beforeend", html);
  }
  render(data) {
    // console.log(data);
    // if (typeof data === "undefined" || data.length === 0) return;
    this.clearParentEl();
    const html = this._generateMarkUp(data);

    return this._parentEl.insertAdjacentHTML("beforeend", html);
  }
  renderSpiner() {
    this.clearParentEl();
    const html = `
    <div class="main-content__spiner">
          <div class="preloader-spiner">
            <span class="preloader-text">loading...</span>
          </div>
        </div>`;
    return this._parentEl.insertAdjacentHTML("beforeend", html);
  }

  _generateMarkUp(data) {
    // if (!Array.isArray(data)) return;

    return data
      .map((el) => {
        const tag = el.playtime === 0 ? "Game Count" : "Play Time";
        const tagTwo = el.playtime === 0 ? "not available" : el.playtime;

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
            <p class="card__text">${tag} : ${tagTwo} ${
          el.playtime ? "hours" : ""
        }</p>
            <button class='modal-btn' data-id="${el.id}">More</button>
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
        const tag = el.playtime === 0 ? "Game Count" : "Play Time";
        const tagTwo = el.playtime === 0 ? "not available" : el.playtime;
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
          <p class="card__text">${tag} : ${tagTwo} ${
          el.playtime ? "hours" : ""
        }</p>
          <button class='modal-btn' data-id="${el.id}">More</button>
        </div>
      </div>
      </figure>
      `;
      })
      .join("");
  }

  clearParentEl() {
    this._parentEl.innerHTML = "";
  }
  setType(type) {
    this._parentEl.dataset.type = type;
  }
}

export default CardView;

// https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1600
