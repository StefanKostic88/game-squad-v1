import CardView from "./CardView.js";

class AllGameCardView extends CardView {
  selectAllHandler(handler) {
    this._sidebarNavContainerEL.addEventListener("click", function (e) {
      const btn = e.target.closest(".main-sidebar__list-item").dataset.select;
      e.preventDefault();
      if (btn !== "all") return;
      console.log(btn);
      handler(btn);
    });
  }
  paginationHandler(handler) {
    this._paginationEl.addEventListener("click", function (e) {
      const isValid = e.target.closest("a");
      if (!isValid) return;
      const btnType = e.target.closest("a").dataset.page;
      const btnVal = e.target.closest("a").dataset.current;
      handler(btnType, btnVal);
    });
  }
}

export default new AllGameCardView();
