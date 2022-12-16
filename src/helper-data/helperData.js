export const genrePageData = [
  { term: "Action", lastPage: 64 },
  { term: "Indie", lastPage: 14 },
  { term: "Adventure", lastPage: 250 },
  { term: "RPG", lastPage: 60 },
  { term: "Strategy", lastPage: 12 },
  { term: "Shooter", lastPage: 180 },
  { term: "Casual", lastPage: 70 },
  { term: "Simulation", lastPage: 250 },
  { term: "Puzzle", lastPage: 160 },
  { term: "Arcade", lastPage: 59 },
  { term: "Platformer", lastPage: 97 },
  { term: "Racing", lastPage: 250 },
  { term: "Massively Multiplayer", lastPage: 50 },
  { term: "Sports", lastPage: 82 },
  { term: "Fighting", lastPage: 250 },
  { term: "Family", lastPage: 45 },
  { term: "Board Games", lastPage: 250 },
  { term: "Educational", lastPage: 11 },
  { term: "Card", lastPage: 205 },
];

// "Indie", 14
// "Adventure", 250
// "RPG", 60
// "Strategy", 12
// "Shooter", 180
// "Casual", 70
// "Simulation", 250
// "Puzzle", 160
// "Arcade", 59
// "Platformer", 97
// "Racing", 250
// "Massively Multiplayer", 50
// "Sports", 82
// "Fighting", 250
// "Family", 45
// "Board Games", 250
// "Educational", 11
// "Card", 205

export const getEndOfPaginationData = function (curPage) {
  return {
    prevHundred: curPage - 100,
    prevTen: curPage - 10,
    prevPage: curPage - 1,
    curPage: curPage,
    nextPage: null,
    nextTen: null,
    nextHundred: null,
  };
};

export const PAGE_TYPE = {
  typeNextTen: "next-10",
  typePrevTen: "prev-10",
  typeNextHundred: "next-100",
  typePrevHundred: "prev-100",
};
