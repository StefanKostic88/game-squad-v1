import CardPaginationView from "../View/CardPaginationView/CardPaginationView.js";
import ErrorModal from "../View/ModalView/ErrorModal.js";
import { controlSelectAllSection } from "./allGameViewCardControler.js";

export const errorControler = function (errorType) {
  if (errorType === "all-section" || errorType === "search-section") {
    controlSelectAllSection();
    ErrorModal.unableInput();
    ErrorModal.unablePagination();
    CardPaginationView.renderPag(
      null,
      null,
      null,
      1,
      2,
      11,
      101,
      "all-games-btn"
    );
  }
  if (errorType === "genre-section") {
    controlGenreView("Action");
    ErrorModal.unableInput();
  }
  if (errorType === "publisher-section") {
    controlPublisher();
    ErrorModal.unableInput();
  }
};
