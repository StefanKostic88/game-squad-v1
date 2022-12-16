import * as model from "../model.js";

import PublisherCardView from "../View/CardView/PublisherCardView.js";

import CardPaginationView from "../View/CardPaginationView/CardPaginationView.js";
import ErrorModal from "../View/ModalView/ErrorModal.js";

import { PAGE_TYPE } from "../helper-data/helperData.js";
export const controlPublisher = async function () {
  try {
    PublisherCardView.setType("all-publishers");
    model.state.page = { ...model.resetPage() };
    CardPaginationView.renderPag(
      model.state.page.prevHundred,
      model.state.page.prevTen,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      model.state.page.nextTen,
      model.state.page.nextHundred,
      "publishers-games-btn"
    );
    model.state.allGamesDataPage = [
      ...(await model.getPublishersData(model.state.page.curPage)),
    ];
    if (model.state.bookmarks.length !== 0) {
      model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
        model.state.allGamesDataPage,
        model.state.bookmarks
      );
    }

    PublisherCardView.render(model.state.allGamesDataPage);
    console.log(model.state.allGamesDataPage);

    PublisherCardView.loadCardHandler();
  } catch (err) {
    console.log(err);
    err.message = "Something went wrong, try again";
    ErrorModal.renderError(err.message, "publisher-section");
  }
};

// PublisherCardView.publisherPagination

export const controlPublisherPagination = async function (type, val) {
  console.log(type, val);
  try {
    const btn = document.querySelector(".pagination").querySelector("a");
    if (!btn.classList.contains("publishers-games-btn")) return;
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

    model.state.allGamesDataPage = [
      ...(await model.getPublishersData(model.state.page.curPage)),
    ];
    PublisherCardView.render(model.state.allGamesDataPage);
    if (model.state.bookmarks.length !== 0) {
      model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
        model.state.allGamesDataPage,
        model.state.bookmarks
      );
    }
    PublisherCardView.render(model.state.allGamesDataPage);
    CardPaginationView.renderPag(
      model.state.page.prevHundred,
      model.state.page.prevTen,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      model.state.page.nextTen,
      model.state.page.nextHundred,
      "publishers-games-btn"
    );
    PublisherCardView.loadCardHandler();
  } catch (err) {
    err.message = "Something went wrong, try again";
    ErrorModal.renderError(err.message, "publisher-section");
  }
};

/////////////////////////////////////
// CONTROL PUBLISHER
/////////////////////////////////////

// const controlPublisher = async function (e) {
//   try {
//     model.state.page = { ...model.resetPage() };
//     CardPaginationView.renderPag(
//       model.state.page.prevHundred,
//       model.state.page.prevTen,
//       model.state.page.prevPage,
//       model.state.page.curPage,
//       model.state.page.nextPage,
//       model.state.page.nextTen,
//       model.state.page.nextHundred,
//       "publishers-games-btn"
//     );
//     model.state.allGamesDataPage = [
//       ...(await model.getPublishersData(model.state.page.curPage)),
//     ];
//     if (model.state.bookmarks.length !== 0) {
//       model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
//         model.state.allGamesDataPage,
//         model.state.bookmarks
//       );
//     }

//     PublisherCardView.render(model.state.allGamesDataPage);

//     PublisherCardView.loadCardHandler();
//   } catch (err) {
//     ErrorModal.renderError(err.message, "publisher-section");
//   }
// };

// PublisherCardView.publisherPagination(async function (type, val) {
//   console.log(type, val);
//   try {
//     const btn = document.querySelector(".pagination").querySelector("a");
//     if (!btn.classList.contains("publishers-games-btn")) return;
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

//     model.state.allGamesDataPage = [
//       ...(await model.getPublishersData(model.state.page.curPage)),
//     ];
//     PublisherCardView.render(model.state.allGamesDataPage);
//     if (model.state.bookmarks.length !== 0) {
//       model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
//         model.state.allGamesDataPage,
//         model.state.bookmarks
//       );
//     }
//     PublisherCardView.render(model.state.allGamesDataPage);
//     CardPaginationView.renderPag(
//       model.state.page.prevHundred,
//       model.state.page.prevTen,
//       model.state.page.prevPage,
//       model.state.page.curPage,
//       model.state.page.nextPage,
//       model.state.page.nextTen,
//       model.state.page.nextHundred,
//       "publishers-games-btn"
//     );
//     PublisherCardView.loadCardHandler();
//   } catch (err) {
//     ErrorModal.renderError(err.message, "publisher-section");
//   }
// });
