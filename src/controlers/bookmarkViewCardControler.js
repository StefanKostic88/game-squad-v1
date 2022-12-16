import * as model from "../model.js";
import BookmarkCardView from "../View/CardView/BookmarkCardView.js";
import CardPaginationView from "../View/CardPaginationView/CardPaginationView.js";
import ErrorModal from "../View/ModalView/ErrorModal.js";
import {
  PAGE_TYPE,
  getEndOfPaginationData,
} from "../helper-data/helperData.js";

export const initBookmarkPage = function () {
  try {
    if (model.state.bookmarks.length === 0) {
      throw new Error("No bookmarks yet");
    }
    BookmarkCardView.setType("all-bookmarks");
    model.state.page = { ...model.resetPage() };
    CardPaginationView.renderPag(
      null,
      null,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      null,
      null,
      "bookmark-games-btn"
    );
    model.state.allGamesDataPage = model.initAllBookmarks(
      model.state.bookmarks
    );

    BookmarkCardView.render(model.state.allGamesDataPage);
    BookmarkCardView.loadCardHandler();
  } catch (err) {
    ErrorModal.renderError(err.message, "all-section");
  }
};

export const controlBookmarkPage = function (type, val) {
  try {
    const btn = document.querySelector(".pagination").querySelector("a");
    if (!btn.classList.contains("bookmark-games-btn")) return;
    switch (type) {
      case PAGE_TYPE.typeNextTen:
      case PAGE_TYPE.typePrevTen:
      case PAGE_TYPE.typeNextHundred:
      case PAGE_TYPE.typePrevHundred:
        model.state.page = model.pagination(type, +val);
        break;
      default:
        model.state.page = model.pagination(type, model.state.page.curPage);
    }

    if (model.state.page.nextPage > model.state.lastPage) {
      model.state.page = getEndOfPaginationData(model.state.lastPage);
    }

    model.state.allGamesDataPage = model.bookmarkPagination(
      type,
      model.state.bookmarks,

      model.state.page.curPage
    );

    BookmarkCardView.render(model.state.allGamesDataPage);
    CardPaginationView.renderPag(
      null,
      null,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      null,
      null,
      "bookmark-games-btn"
    );
    BookmarkCardView.loadCardHandler();
    // console.log(model.state.allbookmarkedGames);
  } catch (err) {}
};

/////////////////////////////////////////////////////////////
// ////////////  BOOKMARKS
/////////////////////////////////////////////////////////////
// const initBookmarkPage = function () {
//   model.state.page = { ...model.resetPage() };
//   console.log(model.state.page);
//   CardPaginationView.renderPag(
//     null,
//     null,
//     model.state.page.prevPage,
//     model.state.page.curPage,
//     model.state.page.nextPage,
//     null,
//     null,
//     "bookmark-games-btn"
//   );
//   model.state.allGamesDataPage = model.initAllBookmarks(model.state.bookmarks);

//   BookmarkCardView.render(model.state.allGamesDataPage);
//   BookmarkCardView.loadCardHandler();
// };

// const controlBookmarkPage = function (type, val) {
//   const btn = document.querySelector(".pagination").querySelector("a");
//   if (!btn.classList.contains("bookmark-games-btn")) return;
//   switch (type) {
//     case PAGE_TYPE.typeNextTen:
//     case PAGE_TYPE.typePrevTen:
//     case PAGE_TYPE.typeNextHundred:
//     case PAGE_TYPE.typePrevHundred:
//       model.state.page = model.pagination(type, +val);
//       break;
//     default:
//       model.state.page = model.pagination(type, model.state.page.curPage);
//   }

//   if (model.state.page.nextPage > model.state.lastPage) {
//     model.state.page = getEndOfPaginationData(model.state.lastPage);
//   }

//   model.state.allGamesDataPage = model.bookmarkPagination(
//     type,
//     model.state.bookmarks,

//     model.state.page.curPage
//   );

//   BookmarkCardView.render(model.state.allGamesDataPage);
//   CardPaginationView.renderPag(
//     null,
//     null,
//     model.state.page.prevPage,
//     model.state.page.curPage,
//     model.state.page.nextPage,
//     null,
//     null,
//     "bookmark-games-btn"
//   );
//   BookmarkCardView.loadCardHandler();
//   // console.log(model.state.allbookmarkedGames);
// };
