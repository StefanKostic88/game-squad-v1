class BookmarkTabView {
  _parentEl = document.querySelector(".bookmark__list");
  _paginationContainer = document.querySelector(".bookmark__pagination");
  _openSettingsTabEl = document.querySelector(".settings__open");
  _openBookmarksTabEl = document.getElementById("open-bookmarks");
  _bookmarkContainerEl = document.querySelector(".bookmark");

  openBookmarkTab() {
    this._openBookmarksTabEl.addEventListener("click", function (e) {
      const isValid = e.target.id === "open-bookmarks";

      if (isValid) {
        document.querySelector(".bookmark").classList.toggle("bookmark-close");
      } else {
        console.log(isValid);
      }
    });
  }

  openCloseSettingstab() {
    this._openSettingsTabEl.addEventListener("click", function () {
      document
        .querySelector(".settings__list")
        .classList.toggle("settings__list-hiden");
    });
    //add clear bookmark list when toggle settings tab
  }

  tabPaginationHandler(handler) {
    this._paginationContainer.addEventListener("click", function (e) {
      const click = e.target.dataset.page;
      if (!click) return;
      handler(click);
    });
  }

  renderPag(curPage, pageCount) {
    this.clearPaginationEl();
    const html = this.generateBookmarkTabPagination(curPage, pageCount);
    return this._paginationContainer.insertAdjacentHTML("beforeend", html);
  }
  render(data) {
    this.clearParentEl();
    this._paginationContainer.classList.remove("hide");
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
    return data
      .map((el) => {
        if (el.bookmarked) {
          return `<li class="bookmark__item" data="${el.id}">
        <div class="bookmark__img-container">
        <img class="bookmark__img" src="${el.img}">
        </div>
        <h3 class="bookmark__heading">${el.title}</h3>
      
      </li>`;
        }
      })
      .join("");
  }
  generateBookmarkTabPagination(curPage, pageCount) {
    return `<button class="bookmark__btn bookmark__btn-prev ${
      curPage === 1 ? "hiden" : ""
    }" data-page="prev">
    &lt;
    </button>
    <span class="bookmark__current-page">${curPage}</span>
    <button class="bookmark__btn bookmark__btn-next ${
      curPage === pageCount ? "hiden" : ""
    }" data-page="next">
    &gt;
    </button>`;
  }
  clearParentEl() {
    this._parentEl.innerHTML = "";
  }
  clearPaginationEl() {
    this._paginationContainer.innerHTML = "";
  }

  renderError() {
    this.clearParentEl;
    const html = `<h2>Nothing bookmarked yet</h2>`;
    this._parentEl.insertAdjacentHTML("beforeend", html);
  }

  showPagination() {
    this._paginationContainer.classList.remove("remove-book-pagination");
  }
  hidePagination() {
    this._paginationContainer.classList.add("remove-book-pagination");
  }
}

export default new BookmarkTabView();
