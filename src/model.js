const API__Key = "86745837ddab481b8d3fe3d605995cb9";
const API_URL = `https://api.rawg.io/api/games`;
const PAGE_SIZE = "40";
const TIME_FOR_ERROR = 3;

export const state = {
  gameDetial: {},
  allGamesDataPage: [],
  searchTerm: "",
  page: {
    prevPage: null,
    curPage: 1,
    nextPage: 2,
    firstPage: 1,
    nextTen: 11,
    prevTen: null,
    nextHundred: 101,
    prevHundred: null,
  },
  lastPage: 0,
  bookmarks: [],
  allbookmarkedGames: [],

  bookmarkBookmarkSectionCurPage: 1,
  bookMarkPageCount: 0,
  bookmarkcurPage: 0,
  bookmarkTabPage: [],
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>GENERATE BOOKMARK DATA<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const initBookmarkData = function () {
  let storage = [];
  if (localStorage.getItem("bookmark") === null) {
    state.bookmarks = [];
    // {
    //   title: "Grand Theft Auto V",
    //   id: 3498,
    //   img: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    //   playtime: 72,
    //   bookmarked: true,
    // },
  } else {
    storage = [...JSON.parse(localStorage.getItem("bookmark"))];
    // state.bookmarks = [...storage];
  }

  const convertedArr = storage.map((el) => {
    return {
      title: el.title,
      id: el.id,
      img: el.img,
      playtime: el.playtime || null,
      overalGames: el.overalGames || null,
      bookmarked: el.bookmarked,
    };
  });
  // console.log(convertedArr);
  //////FUNKCIJA ZAKONVERTOVANJE U OBJ
  state.bookmarks = [...convertedArr];
  return state.bookmarks;
};

///SADA IDI PO VIEW I PROMENI NULL I OSTALE STVARI ZA GENERISANJE CARDS
initBookmarkData();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>GENERATE GAME CARD<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const generateCardData = function (obj) {
  return {
    title: obj.name,
    gameCount: obj.gameCount,
    id: obj.id,
    img: obj.background_image,
    playtime: obj.playtime,
    bookmarked: false,
  };
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>GENERATE PUBLISHER CARD<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const generatePublisherData = function (obj) {
  return {
    img: obj.image_background,
    id: obj.id,
    title: obj.name,
    overalGames: obj.games_count,
    bookmarked: false,
  };
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>GENERATE MODAL CARD<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const getModalGameDetail = function (obj) {
  state.gameDetial = {
    img: obj.background_image,
    publishers: obj.publishers[0].name,
    metacritic: obj.metacritic,
    title: obj.name,
    description: obj.description_raw,
    tags: obj.tags,
    platforms: obj.platforms,
    website: obj.website,
  };
  return state.gameDetial;
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>ALL GAMES SECTION DATA AND PAGINATION<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error());
    }, s * 1000);
  });
};

export const getCardsData = async function (curPage) {
  try {
    const res = await Promise.race([
      fetch(
        `${API_URL}?key=${API__Key}&page=${curPage}&page_size=${PAGE_SIZE}`
      ),

      timeout(TIME_FOR_ERROR),
    ]);

    if (!res.ok) throw new Error();
    const { results, count } = await res.json();
    const lastPage = Math.ceil(count / PAGE_SIZE);
    state.lastPage = lastPage;

    const data = results.map((el) => {
      return generateCardData(el);
    });

    return data;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>SEARCH<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const getSerachData = async function (searchTearm, curPage) {
  try {
    const res = await Promise.race([
      fetch(
        `${API_URL}?key=${API__Key}&page=${curPage}&page_size=${PAGE_SIZE}&search=${searchTearm}`
      ),
      timeout(TIME_FOR_ERROR),
    ]);

    if (!res.ok) throw new Error();
    const { results, count } = await res.json();

    const lastPage = Math.ceil(count / PAGE_SIZE);

    state.lastPage = lastPage;
    const data = results.map((el) => {
      return generateCardData(el);
    });

    return data;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

// 2351 / 40
// 63/40
// getSerachData("bioware", 8);
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>PUBLISHERS<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const getPublishersData = async function (curPage) {
  try {
    const res = await Promise.race([
      fetch(
        `https://api.rawg.io/api/developers?key=${API__Key}&page=${curPage}&page_size=${PAGE_SIZE}`
      ),
      timeout(TIME_FOR_ERROR),
    ]);

    if (!res.ok) throw new Error();
    const { results } = await res.json();
    const data = results.map((el) => generatePublisherData(el));
    return data;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>MODAL<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const getModalData = async function (id) {
  try {
    const res = await fetch(` ${API_URL}/${id}?key=${API__Key}`);
    const data = await res.json();
    getModalGameDetail(data);
  } catch (err) {
    console.log(err);
  }
};

///PUBLISHER MODAL DATA

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>Helper Functions<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const pagination = function (click, value) {
  let counter = value;
  if (click === "next") {
    counter++;
  }
  if (click === "prev" && counter > 1) {
    counter--;
  }
  state.page = {
    ...{
      curPage: counter,
      nextPage: counter + 1,
      prevPage: counter - 1,
      nextTen: counter + 10,
      prevTen: counter - 10,
      nextHundred: counter + 100,
      prevHundred: counter - 100,
    },
  };

  return state.page;
};

export const resetPage = function () {
  return (state.page = {
    prevPage: null,
    curPage: 1,
    nextPage: 2,
    firstPage: 1,
    nextTen: 11,
    prevTen: null,
    nextHundred: 101,
    prevHundred: null,
    // lastPage: 5727,
  });
};
//// GET UNIQUE ARRAY OF OBJ
// export const reduceUniqueArr = function (arr) {
//   return arr.reduce((finalArray, cur) => {
//     let obj = finalArray.find((el) => el.id === cur.id);
//     if (obj) {
//       return finalArray;
//     } else {
//       return finalArray.concat([cur]);
//     }
//   }, []);
// };

////////////////////////////
/////CHECK, SET AND UPDATE BOOKMARKED STATUS
//////////////////////////

export const addAndRemoveBookMarkStatus = function (arr, id) {
  const data = arr;
  const findCard = data.find((el) => el.id === id);
  const newCard = {
    ...findCard,
    bookmarked: findCard.bookmarked ? false : true,
  };
  const newCardIndex = data.indexOf(findCard);
  data[newCardIndex] = newCard;
  state.bookmarks = updateBookmark(state.bookmarks, newCard, id);
  // //ADD TO LOCAL STORAGE
  localStorage.setItem("bookmark", JSON.stringify(state.bookmarks));
  // console.log(data);
  return data;
};

const updateBookmark = function (arr, newCard, id) {
  const data = [...arr];
  const findCard = data.find((el) => el.id === id);
  const findCardIndex = data.indexOf(findCard);
  if (newCard.bookmarked) {
    //ADD TO BOOKMARK
    data.push(newCard);
  } else {
    //REMOVE FFROM BOOKMARK
    data.splice(findCardIndex, 1);
  }
  return data;
};

export const checkAndUpdateBookmarkedStatus = function (arr, bookArr) {
  const data = arr;
  if (bookArr.length === 0) return data;
  data.forEach((el, index) => {
    bookArr.forEach((el1, index1) => {
      if (el1.id === el.id) {
        data[index] = bookArr[index1];
      }
    });
  });

  return data;
};

/////////////////////////////////////////////////////////////////
///////////////BOOKMARK TAB AND BOOKMARK CARDS FUNCTIONS/////////
//////////////////////////////////////////////////////////////////

export const bookmarkTabPagination = function (click, arr, curPage) {
  let currentPage = curPage;
  const rowsPerPage = 10;
  const pageCount = Math.ceil(arr.length / rowsPerPage);
  let page, rowEnd, rowStart;

  if (click === "next") {
    currentPage--;
    rowStart = rowsPerPage * (currentPage + 1);
    rowEnd = rowStart + rowsPerPage;
    page = arr.slice(rowStart, rowEnd);
    currentPage += 2;
  }
  if (click === "prev") {
    currentPage++;
    currentPage -= 2;
    rowStart = rowsPerPage * (currentPage - 1);
    rowEnd = rowStart + rowsPerPage;
    page = arr.slice(rowStart, rowEnd);
  }
  console.log(page);
  return { page, currentPage, pageCount };
};

export const getBookmarkTabData = function (arr) {
  const bookmarkTabArr = arr.map((el) => {
    return {
      id: el.id,
      img: el.img,
      title: el.title,
      bookmarked: el.bookmarked,
    };
  });
  return bookmarkTabArr;
};

export const initAllBookmarks = function (arr) {
  console.log();
  let pageIndex = 0;
  const rowsPerPage = 20;
  let rowStart = rowsPerPage * pageIndex;
  let rowEnd = rowStart + rowsPerPage;
  let page = arr.slice(rowStart, rowEnd);
  state.lastPage = Math.ceil(arr.length / rowsPerPage);
  return page;
};

export const bookmarkPagination = function (click, arr, curPage) {
  let currentPage = curPage;
  const rowsPerPage = 20;
  const pageCount = Math.ceil(arr.length / rowsPerPage);
  let pageIndex, page, rowEnd, rowStart;

  if (click === "next" && currentPage <= pageCount) {
    pageIndex = currentPage - 1;
    rowStart = rowsPerPage * pageIndex;
    rowEnd = rowStart + rowsPerPage;
    page = arr.slice(rowStart, rowEnd);
    currentPage++;
  }

  if (click === "prev") {
    pageIndex = currentPage - 1;
    rowStart = rowsPerPage * pageIndex;
    rowEnd = rowStart + rowsPerPage;
    page = arr.slice(rowStart, rowEnd);
    currentPage--;
  }

  return page;
};

export const wait = function (data) {
  return data;
};
