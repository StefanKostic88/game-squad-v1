import * as model from "../model.js";
import GenreView from "../View/CardView/GenreView.js";
import GameSearchView from "../View/CardView/GameSearchView.js";
import CardPaginationView from "../View/CardPaginationView/CardPaginationView.js";
import ErrorModal from "../View/ModalView/ErrorModal.js";
import {
  genrePageData,
  getEndOfPaginationData,
  PAGE_TYPE,
} from "../helper-data/helperData.js";

export const controlGenreViewTags = function () {
  GenreView.render();
  GenreView.toggleListHandler();
};

export const controlGenreView = async function (e) {
  try {
    model.state.searchTerm = e;
    GameSearchView.setType("all-genre");
    model.state.page = { ...model.resetPage() };
    // console.log(model.state.allGamesDataPage);

    CardPaginationView.renderPag(
      model.state.page.prevHundred,
      model.state.page.prevTen,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      model.state.page.nextTen,
      model.state.page.nextHundred,
      "genre-games-btn"
    );
    const btn = document.querySelector(".pagination").querySelector("a");
    if (!btn.classList.contains("genre-games-btn")) return;

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
    console.log(model.state.allGamesDataPage);

    GameSearchView.loadCardHandler();
  } catch (err) {
    err.message = "Something went wrong, try again";
    ErrorModal.renderError(err.message, "genre-section");
  }
};
export const controlGenrePagination = async function (type, val) {
  try {
    const btn = document.querySelector(".pagination").querySelector("a");
    if (!btn.classList.contains("genre-games-btn")) return;

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

    genrePageData.forEach((el) => {
      if (
        model.state.page.curPage > el.lastPage &&
        model.state.searchTerm === el.term
      ) {
        model.state.page = {
          ...getEndOfPaginationData(el.lastPage),
        };
      }
    });
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
      "genre-games-btn"
    );
    GameSearchView.loadCardHandler();
  } catch (err) {
    err.message = "Something went wrong, try again";
    ErrorModal.renderError(err.message, "genre-section");
  }
};

//////////////////////////////////
// GENRE VIEW
/////////////////////////

// const controlGenreViewTags = function () {
//   GenreView.render();
//   GenreView.toggleListHandler();
// };

// const controlGenreView = async function (e) {
//   try {
//     model.state.searchTerm = e;
//     model.state.page = { ...model.resetPage() };
//     // console.log(model.state.allGamesDataPage);

//     CardPaginationView.renderPag(
//       model.state.page.prevHundred,
//       model.state.page.prevTen,
//       model.state.page.prevPage,
//       model.state.page.curPage,
//       model.state.page.nextPage,
//       model.state.page.nextTen,
//       model.state.page.nextHundred,
//       "genre-games-btn"
//     );
//     const btn = document.querySelector(".pagination").querySelector("a");
//     if (!btn.classList.contains("genre-games-btn")) return;

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
//     ErrorModal.renderError(err.message, "genre-section");
//     console.log("genre2");
//   }
// };
// GenreView.paginationHandler(async function (type, val) {
//   try {
//     const btn = document.querySelector(".pagination").querySelector("a");
//     if (!btn.classList.contains("genre-games-btn")) return;

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

//     genrePageData.forEach((el) => {
//       if (
//         model.state.page.curPage > el.lastPage &&
//         model.state.searchTerm === el.term
//       ) {
//         model.state.page = {
//           ...getEndOfPaginationData(el.lastPage),
//         };
//       }
//     });
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
//       "genre-games-btn"
//     );
//     GameSearchView.loadCardHandler();
//   } catch (err) {
//     ErrorModal.renderError(err.message, "genre-section");
//   }
// });
