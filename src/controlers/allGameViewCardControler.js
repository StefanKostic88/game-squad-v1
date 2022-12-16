import * as model from "../model.js";
import AllGameCardView from "../View/CardView/AllGameCardView.js";
import CardPaginationView from "../View/CardPaginationView/CardPaginationView.js";
import ErrorModal from "../View/ModalView/ErrorModal.js";
import { PAGE_TYPE } from "../helper-data/helperData.js";
export const controlSelectAllSection = async function (e = "all") {
  try {
    AllGameCardView.setType("all-games");
    model.state.page = { ...model.resetPage() };
    CardPaginationView.renderPag(
      model.state.page.prevHundred,
      model.state.page.prevTen,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      model.state.page.nextTen,
      model.state.page.nextHundred,
      "all-games-btn"
    );
    const btn = document.querySelector(".pagination").querySelector("a");
    // console.log(!btn.classList.contains("all-games-btn"));
    if (!btn.classList.contains("all-games-btn")) return;
    AllGameCardView.renderSpiner();

    model.state.allGamesDataPage = [
      ...(await model.getCardsData(model.state.page.curPage)),
    ];
    // if (model.state.bookmarks.length === 0) {
    //   model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
    //     model.state.allGamesDataPage,
    //     model.state.bookmarks
    //   );

    //   AllGameCardView.render(model.state.allGamesDataPage);
    //   // console.log(module.state.allGamesDataPage);

    //   AllGameCardView.loadCardHandler();
    // }

    model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
      model.state.allGamesDataPage,
      model.state.bookmarks
    );

    AllGameCardView.render(model.state.allGamesDataPage);
    // console.log(module.state.allGamesDataPage);

    AllGameCardView.loadCardHandler();
  } catch (err) {
    console.log("error1");
    console.log(err);

    err.message = "Problems while loading, Try again later";
    ErrorModal.renderError(err.message, "all-section");
  }
};

export const controlSelectAllPagination = async function (type, val) {
  try {
    const btn = document.querySelector(".pagination").querySelector("a");
    if (!btn.classList.contains("all-games-btn")) return;

    AllGameCardView.renderSpiner();
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

    console.log(model.state.page, "ALLGAMES SECTION");

    model.state.allGamesDataPage = await model.getCardsData(
      model.state.page.curPage
    );

    // if (model.state.bookmarks.length !== 0) {
    //   model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
    //     model.state.allGamesDataPage,
    //     model.state.bookmarks
    //   );
    // }
    model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
      model.state.allGamesDataPage,
      model.state.bookmarks
    );

    AllGameCardView.render(model.state.allGamesDataPage);
    CardPaginationView.renderPag(
      model.state.page.prevHundred,
      model.state.page.prevTen,
      model.state.page.prevPage,
      model.state.page.curPage,
      model.state.page.nextPage,
      model.state.page.nextTen,
      model.state.page.nextHundred,
      "all-games-btn"
    );
    AllGameCardView.loadCardHandler();
  } catch (err) {
    console.log("error2");
    console.log(err);
    err.message = "Something went wrong while tring to load the page";
    ErrorModal.renderError(err.message, "all-section");
  }
};

/////////////////////////////////////////////////////////////
// ////////////  Select All Section And Reset Page state to 1
/////////////////////////////////////////////////////////////

// const controlSelectAllSection = async function (e = "all") {
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
//       "all-games-btn"
//     );
//     const btn = document.querySelector(".pagination").querySelector("a");
//     // console.log(!btn.classList.contains("all-games-btn"));
//     if (!btn.classList.contains("all-games-btn")) return;
//     AllGameCardView.renderSpiner();

//     model.state.allGamesDataPage = [
//       ...(await model.getCardsData(model.state.page.curPage)),
//     ];

//     if (model.state.bookmarks.length !== 0) {
//       model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
//         model.state.allGamesDataPage,
//         model.state.bookmarks
//       );

//       AllGameCardView.render(model.state.allGamesDataPage);

//       AllGameCardView.loadCardHandler();
//     }
//   } catch (err) {
//     console.log("error1");
//     ErrorModal.renderError(err.message, "all-section");
//   }
// };

// AllGameCardView.paginationHandler(async function (type, val) {
//   try {
//     const btn = document.querySelector(".pagination").querySelector("a");
//     if (!btn.classList.contains("all-games-btn")) return;

//     AllGameCardView.renderSpiner();
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

//     console.log(model.state.page, "ALLGAMES SECTION");

//     model.state.allGamesDataPage = await model.getCardsData(
//       model.state.page.curPage
//     );

//     if (model.state.bookmarks.length !== 0) {
//       model.state.allGamesDataPage = model.checkAndUpdateBookmarkedStatus(
//         model.state.allGamesDataPage,
//         model.state.bookmarks
//       );
//     }
//     AllGameCardView.render(model.state.allGamesDataPage);
//     CardPaginationView.renderPag(
//       model.state.page.prevHundred,
//       model.state.page.prevTen,
//       model.state.page.prevPage,
//       model.state.page.curPage,
//       model.state.page.nextPage,
//       model.state.page.nextTen,
//       model.state.page.nextHundred,
//       "all-games-btn"
//     );
//     AllGameCardView.loadCardHandler();
//   } catch (err) {
//     console.log("error2");
//     ErrorModal.renderError(err.message, "all-section");
//   }
// });
