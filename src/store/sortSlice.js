import { createSlice } from "@reduxjs/toolkit";

let itemSort = createSlice({
  name: "itemSort",
  initialState: { items: [], no: [] },
  reducers: {
    nameSort(state, action) {
      let copy = [...action.payload].sort((a, b) =>
        a.title > b.title ? 1 : -1
      );

      let no_copy = copy.map((item) => item.id);
      console.log("정렬후:" + copy);
      state.items = copy;
      state.no = no_copy;
    },
    lowPriceSort(state, action) {
      let copy = [...action.payload].sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      let no_copy = copy.map((item) => item.id);
      console.log("정렬후:" + action);
      return { items: copy, no: no_copy };
    },
    highPriceSort(state, action) {
      let copy = [...action.payload].sort((a, b) =>
        b.price > a.price ? 1 : -1
      );
      console.log("정렬후:" + copy);
      let no_copy = copy.map((item) => item.id);
      return { items: copy, no: no_copy };
    },
  },
});
export let { nameSort, lowPriceSort, highPriceSort } = itemSort.actions;
export default itemSort.reducer;
