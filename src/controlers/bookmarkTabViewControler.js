import * as model from "../model.js";

import BookmarkTabView from "../View/BookmarkTabView.js";

export const controlBookmarkTab = function (input) {
  try {
    console.log(model.state.bookmarks);
    if (model.state.bookmarks.length === 0) throw new Error();
    model.state.bookmarks.forEach((el) => {
      // console.log(typeof el, "el");
      if (typeof el !== "object") throw new Error();
    });
    // console.log(
    //   input,
    //   model.state.bookmarks,
    //   model.state.bookmarkcurPage,
    //   "input"
    // );
    let { page, currentPage, pageCount } = model.bookmarkTabPagination(
      input,
      model.state.bookmarks,
      model.state.bookmarkcurPage
    );
    console.log(currentPage);
    const data = model.getBookmarkTabData(page);
    model.state.bookmarkTabPage = data;
    model.state.bookmarkcurPage = currentPage;
    model.state.bookMarkPageCount = pageCount;

    BookmarkTabView.render(data);

    BookmarkTabView.renderPag(
      model.state.bookmarkcurPage,
      model.state.bookMarkPageCount
    );
  } catch (err) {
    BookmarkTabView.renderError(model.state.bookmarks);
  }
};

// const controlBookmarkTab = function (input) {
//   try {
//     console.log(input);
//     let { page, currentPage, pageCount } = model.bookmarkTabPagination(
//       input,
//       model.state.bookmarks,
//       model.state.bookmarkcurPage
//     );
//     const data = model.getBookmarkTabData(page);
//     model.state.bookmarkcurPage = currentPage;
//     model.state.bookMarkPageCount = pageCount;
//     BookmarkTabView.renderSpiner();
//     BookmarkTabView.render(data);
//     BookmarkTabView.renderPag(
//       model.state.bookmarkcurPage,
//       model.state.bookMarkPageCount
//     );
//   } catch (err) {
//     BookmarkTabView.renderError();
//   }
// };
