// import "./sass/main.scss";
// import icons from "./img/sprite.svg";
import GenreView from "./View/CardView/GenreView.js";
import AllGameCardView from "./View/CardView/AllGameCardView.js";
import GameSearchView from "./View/CardView/GameSearchView.js";
import PublisherCardView from "./View/CardView/PublisherCardView.js";
import BookmarkCardView from "./View/CardView/BookmarkCardView.js";
import BookmarkTabView from "./View/BookmarkTabView.js";
import GameModalView from "./View/ModalView/GameModalView.js";
// import CardPaginationView from "./View/CardPaginationView/CardPaginationView.js";
import ErrorModal from "./View/ModalView/ErrorModal.js";
import toggleDarkModeView from "./View/toggleDarkModeView.js";
import {
  controlSelectAllSection,
  controlSelectAllPagination,
} from "./controlers/allGameViewCardControler.js";
import {
  controlGenreViewTags,
  controlGenreView,
  controlGenrePagination,
} from "./controlers/genreViewCardControler.js";
import {
  controlPublisher,
  controlPublisherPagination,
} from "./controlers/publisherViewCardControler.js";
import {
  controlSearchBar,
  searchPagination,
} from "./controlers/searchViewCardControler.js";
import {
  initBookmarkPage,
  controlBookmarkPage,
} from "./controlers/bookmarkViewCardControler.js";
import { controlBookmarkTab } from "./controlers/bookmarkTabViewControler.js";
import { controlOpenCloseModal } from "./controlers/openCloseModalControler.js";
import { errorControler } from "./controlers/errorModalControler.js";
import updateView from "./View/UpdateView/updateView.js";
import { updateControler } from "./controlers/updateControler.js";
// .................................................

const init = function () {
  controlGenreViewTags();
  toggleDarkModeView.toggleHandler();

  //CONTROL ALL

  controlSelectAllSection();

  AllGameCardView.selectAllHandler(controlSelectAllSection);
  AllGameCardView.paginationHandler(controlSelectAllPagination);

  // CONTROL GENRE

  GenreView.selectGenreHandler(controlGenreView);
  GenreView.paginationHandler(controlGenrePagination);
  /////////////////////////////////////////////////////
  //CONTROL PUBLISHER

  PublisherCardView.selectPublisherHandler(controlPublisher); //DOBRO
  PublisherCardView.publisherPagination(controlPublisherPagination);

  /////////////////////////////////////////////////////
  //CONTROL SEARCH

  GameSearchView.searchGameHandler(controlSearchBar);
  GameSearchView.searchPagination(searchPagination);

  // CONTROL BOOKMARK CARDS

  BookmarkCardView.selectBookmarkHandler(initBookmarkPage);
  BookmarkCardView.bookmarkPaginationHandler(controlBookmarkPage);

  // CONTROL BOOKMARK TABS

  BookmarkTabView.openCloseSettingstab();
  BookmarkTabView.openBookmarkTab();

  controlBookmarkTab("next");
  BookmarkTabView.tabPaginationHandler(controlBookmarkTab);

  // // >>>>>>>>>MODAL WINDOW<<<<<<<<<

  GameModalView.gameModalHandler(controlOpenCloseModal);
  GameModalView.closeModalKey();
  GameModalView.closeModalClick();

  // >>>>>>>>>ERROR<<<<<<<<<
  ErrorModal.closeErrorHandler(errorControler);

  // >>>>>>>>>UPDATE<<<<<<<<<

  updateView.updateHandler(updateControler);
};

window.addEventListener("load", function () {
  const spinerContainer = document.querySelector(".spinner-container");
  spinerContainer.classList.add("spinner-hiden");
  init();
});
