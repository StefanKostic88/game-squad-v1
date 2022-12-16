import * as model from "../model.js";
import GameSearchView from "../View/CardView/GameSearchView.js";
import CardPaginationView from "../View/CardPaginationView/CardPaginationView.js";
import ErrorModal from "../View/ModalView/ErrorModal.js";
import {
  PAGE_TYPE,
  getEndOfPaginationData,
} from "../helper-data/helperData.js";

export const controlSearchBar = async function (submitedSearch) {
  try {
    GameSearchView.setType("all-search");
    model.state.page = { ...model.resetPage() };
    model.state.searchTerm = submitedSearch;
    CardPaginationView.renderPag(
      model.state.page.prevHundred,
      model.state.page.prevTen,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      model.state.page.nextTen,
      model.state.page.nextHundred,
      "search-games-btn"
    );
    model.state.allGamesDataPage = [
      ...(await model.getSerachData(
        model.state.searchTerm,
        model.state.page.curPage
      )),
    ];
    if (model.state.bookmarks.length !== 0) {
      model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
        model.state.allGamesDataPage,
        model.state.bookmarks
      );
    }
    GameSearchView.render(model.state.allGamesDataPage);
    GameSearchView.loadCardHandler();
  } catch (err) {
    console.log(err);
    err.message = "Something went wrong, try again";
    ErrorModal.renderError(err.message, "search-section");
  }
};
export const searchPagination = async function (type, val) {
  // const click = e;

  try {
    const btn = document.querySelector(".pagination").querySelector("a");
    if (!btn.classList.contains("search-games-btn")) return;
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
    if (model.state.page.curPage > model.state.lastPage) {
      model.state.page = getEndOfPaginationData(model.state.lastPage);
    }
    console.log(model.state.page);
    model.state.allGamesDataPage = [
      ...(await model.getSerachData(
        model.state.searchTerm,
        model.state.page.curPage
      )),
    ];
    if (model.state.bookmarks.length !== 0) {
      model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
        model.state.allGamesDataPage,
        model.state.bookmarks
      );
    }

    GameSearchView.render(model.state.allGamesDataPage);
    CardPaginationView.renderPag(
      model.state.page.prevHundred,
      model.state.page.prevTen,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      model.state.page.nextTen,
      model.state.page.nextHundred,
      "search-games-btn"
    );
    GameSearchView.loadCardHandler();
  } catch (err) {
    err.message = "Something went wrong, try again";
    ErrorModal.renderError(err.message, "search-section");
  }
};

//////////////////////////////////
////SEARCHBAR AND SEARH PAGINATION and reset page state to 1
//////////////////////////////////

// const controlSearchBar = async function (submitedSearch) {
//   try {
//     model.state.page = { ...model.resetPage() };
//     model.state.searchTerm = submitedSearch;
//     CardPaginationView.renderPag(
//       model.state.page.prevHundred,
//       model.state.page.prevTen,
//       model.state.page.prevPage,
//       model.state.page.curPage,
//       model.state.page.nextPage,
//       model.state.page.nextTen,
//       model.state.page.nextHundred,
//       "search-games-btn"
//     );
//     model.state.allGamesDataPage = [
//       ...(await model.getSerachData(
//         model.state.searchTerm,
//         model.state.page.curPage
//       )),
//     ];
//     if (model.state.bookmarks.length !== 0) {
//       model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
//         model.state.allGamesDataPage,
//         model.state.bookmarks
//       );
//     }
//     GameSearchView.render(model.state.allGamesDataPage);
//     GameSearchView.loadCardHandler();
//   } catch (err) {
//     console.log(err);
//   }
// };
// GameSearchView.searchPagination(async function (type, val) {
//   // const click = e;

//   try {
//     const btn = document.querySelector(".pagination").querySelector("a");
//     if (!btn.classList.contains("search-games-btn")) return;
//     switch (type) {
//       case PAGE_TYPE.typeNextTen:
//       case PAGE_TYPE.typePrevTen:
//       case PAGE_TYPE.typeNextHundred:
//       case PAGE_TYPE.typePrevHundred:
//         model.state.page = model.pagination(type, +val);
//         break;
//       default:
//         model.state.page = model.pagination(type, model.state.page.curPage);
//     }

//     // model.state.page = model.pagination(type, model.state.page.curPage);
//     model.state.allGamesDataPage = [
//       ...(await model.getSerachData(
//         model.state.searchTerm,
//         model.state.page.curPage
//       )),
//     ];
//     if (model.state.bookmarks.length !== 0) {
//       model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
//         model.state.allGamesDataPage,
//         model.state.bookmarks
//       );
//     }
//     GameSearchView.render(model.state.allGamesDataPage);
//     CardPaginationView.renderPag(
//       model.state.page.prevHundred,
//       model.state.page.prevTen,
//       model.state.page.prevPage,
//       model.state.page.curPage,
//       model.state.page.nextPage,
//       model.state.page.nextTen,
//       model.state.page.nextHundred,
//       "search-games-btn"
//     );
//     GameSearchView.loadCardHandler();
//   } catch (err) {
//     console.log(err);
//   }
// });
