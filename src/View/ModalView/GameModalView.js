import icons from "../../img/sprite.svg";

class GameModalView {
  _gamePreview = document.querySelector(".game-preview");
  _parentEl = document.querySelector(".game-preview__main");
  _gameListEl = document.querySelector(".game-preview__title-list");
  _cardsContainerEl = document.querySelector(".main-content");

  gameModalHandler(handler) {
    this._cardsContainerEl.addEventListener("click", function (e) {
      const isValid = e.target.closest(".card__content");
      console.log(icons);
      if (!isValid) return;
      const id = +e.target.closest(".card").dataset.id;
      console.log(id);
      handler(id);
      document.querySelector(".modal").classList.remove("modal-hiden");
    });
  }
  closeModalKey() {
    window.addEventListener("keydown", function (e) {
      const isValid = e.key === "Escape";
      if (!isValid) return;
      document.querySelector(".modal").classList.add("modal-hiden");
    });
  }
  closeModalClick() {
    window.addEventListener("click", function (e) {
      const isValid = e.target.classList.contains("modal");

      if (this.window.screen.width <= 1150) {
        const mobileCloseIsValid = e.target.closest("button");
        if (!mobileCloseIsValid) return;
        document.querySelector(".modal").classList.add("modal-hiden");
      } else {
        if (!isValid) return;
        document.querySelector(".modal").classList.add("modal-hiden");
      }
    });
  }

  renderGameDetails(data) {
    this._clearGameDetails();
    const html = this._generateGamesDetialsMarkup(data);
    this._parentEl.insertAdjacentHTML("beforeend", html);
  }

  renderGameList(data) {
    this._clearGameList();
    const html = this._generateGameListMarkup(data);
    // console.log(html);
    this._gameListEl.insertAdjacentHTML("beforeend", html);
  }
  _generateGamesDetialsMarkup(data) {
    console.log(icons);
    return `
    <div class="game-info__container">
    <button class="model-close"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>cross</title>
    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
    </svg></button>
      <div class="game-info__img-container">
        <img
          class="game-info__img"
          src="${data.img}"
          alt="img"
        />
        <div class="game-info__publisher">Publishers: ${data.publishers}</div>

        <div class="game-info__official-container">
        <p class="game-info__official-container__paragraph">
          Go to official webpage
        </p> <a href="${
          data.website
        }" class="game-info__official-container__link" target="_blank">
        <svg class="game-info__official-container__official-webpage"><use xlink:href="${icons}#icon-export"></use>
        </svg></a> 
        
        
      
          
      </div>
      </div>
      <div class="game-info__description">
        <div class="meta">
          <img
            class="meta__logo"
            src="https://www.metacritic.com/images/icons/metacritic-icon.svg"
          />
          <h3 class="meta__score-header">
            Metacritic score: <span class="meta__metacritic-score">${
              data.metacritic
            }</span>
          </h3>
        </div>
        <div class="platforms">
        <h3 class="platforms__header">
                <span class="platforms__icon-container">
                  <svg class="platforms__icon">
                    <use
                      xlink:href="${icons}#icon-game-controller"
                    ></use></svg
                ></span>
                Platforms
              </h3>
        <div class="platforms__container">
        ${data.platforms
          .map((el) => {
            return `<span class="platforms__item">
           ${el.platform.name}
          </span>`;
          })
          .join(" ")} 
        </div>
        </div>
        <div class="tag">
        <h3 class="tag__tag-title">
                <span class="tag__icon-container"
                  ><svg class="tag__icon">
                    <use xlink:href="${icons}#icon-hair-cross"></use></svg
                ></span>
                Tags
              </h3>
          <div class="tag__tags-container">
          ${data.tags
            .map((el) => {
              return ` <span class="tag__tags">${el.name}</span>`;
            })
            .join(" ")}
          </div>
         
        </div>
      </div>
    </div>
    <div class="game-discription__content">
      <h2 class="game-discription__header">"${data.title}"</h2>
      <p class="game-discription__description-text">
        "${data.description}."
      </p>

      <div class="game-discription__btn-container">
        <button class="game-discription__btn">Prev</button>
        <button class="game-discription__btn">Next</button>
      </div>
    </div>
`;
  }
  _generateGameListMarkup(data) {
    return `<ul class="game-preview__list">
    ${data
      .map(
        (el) => `<li class="game-preview__list-item">
    <div class="list-item__img-container">
      <img
        src="${el.img}"
      />
    </div>
    <h2>${el.title}</h2>
  </li>`
      )
      .join("")} </ul>`;
  }
  _clearGameDetails() {
    this._parentEl.innerHTML = "";
  }
  _clearGameList() {
    this._gameListEl.innerHTML = "";
  }
}

export default new GameModalView();
