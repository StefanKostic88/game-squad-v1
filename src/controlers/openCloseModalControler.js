import * as model from "../model.js";

import GameModalView from "../View/ModalView/GameModalView.js";

export const controlOpenCloseModal = async function (input) {
  await model.getModalData(input);
  GameModalView.renderGameDetails(model.state.gameDetial);
  GameModalView.renderGameList(model.state.bookmarks);
};

// MODAL WINDOW
// const controlOpenCloseModal = async function (input) {
//   await model.getModalData(input);
//   GameModalView.renderGameDetails(model.state.gameDetial);
//   GameModalView.renderGameList(model.state.bookmarks);
// };
