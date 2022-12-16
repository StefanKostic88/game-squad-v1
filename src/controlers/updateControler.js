import * as model from "../model.js";

import AllGameCardView from "../View/CardView/AllGameCardView.js";
import GameSearchView from "../View/CardView/GameSearchView.js";
import PublisherCardView from "../View/CardView/PublisherCardView.js";
import BookmarkCardView from "../View/CardView/BookmarkCardView.js";
import BookmarkTabView from "../View/BookmarkTabView.js";
import ErrorModal from "../View/ModalView/ErrorModal.js";

export const updateControler = function (id, type) {
  model.state.allGamesDataPage = model.addAndRemoveBookMarkStatus(
    model.state.allGamesDataPage,
    id
  );

  if (model.state.bookmarkcurPage >= 0) {
    model.state.bookmarkcurPage = 0;
  }
  let { page, currentPage, pageCount } = model.bookmarkTabPagination(
    "next",
    model.state.bookmarks,
    model.state.bookmarkcurPage
  );
  model.state.bookmarkcurPage = currentPage;

  BookmarkTabView.render(page);
  BookmarkTabView.renderPag(currentPage, pageCount);

  if (model.state.bookmarks.length === 0) {
    console.log("NO BOOOK");

    BookmarkTabView.renderError();
    BookmarkTabView.hidePagination();
  } else {
    BookmarkTabView.showPagination();
  }

  if (type === "all-games")
    AllGameCardView.update(model.state.allGamesDataPage);
  if (type === "all-genre") GameSearchView.update(model.state.allGamesDataPage);
  if (type === "all-publishers")
    PublisherCardView.update(model.state.allGamesDataPage);
  if (type === "all-search")
    GameSearchView.update(model.state.allGamesDataPage);
  if (type === "all-bookmarks") BookmarkCardView.update(model.state.bookmarks);
};

// function (id, type) {
//   model.state.allGamesDataPage = model.addAndRemoveBookMarkStatus(
//     model.state.allGamesDataPage,
//     id
//   );

//   if (model.state.bookmarkcurPage >= 0) {
//     model.state.bookmarkcurPage = 0;
//   }
//   let { page, currentPage, pageCount } = model.bookmarkTabPagination(
//     "next",
//     model.state.bookmarks,
//     model.state.bookmarkcurPage
//   );
//   model.state.bookmarkcurPage = currentPage;

//   BookmarkTabView.render(page);
//   BookmarkTabView.renderPag(currentPage, pageCount);

//   if (model.state.bookmarks.length === 0) {
//     console.log("NO");
//     BookmarkTabView.renderError();
//     BookmarkTabView.hidePagination();
//   } else {
//     BookmarkTabView.showPagination();
//   }

//   if (type === "all-games")
//     AllGameCardView.update(model.state.allGamesDataPage);
//   if (type === "all-genre") GameSearchView.update(model.state.allGamesDataPage);
//   if (type === "all-publishers")
//     PublisherCardView.update(model.state.allGamesDataPage);
//   if (type === "all-search")
//     GameSearchView.update(model.state.allGamesDataPage);
//   if (type === "all-bookmarks") BookmarkCardView.update(model.state.bookmarks);
// }
