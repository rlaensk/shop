import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";
import itemSort from "./store/sortSlice.js";

let product = createSlice({
  name: "product",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
    { id: 3, name: "Black and White", count: 2 },
    { id: 4, name: "red Yordan", count: 1 },
  ],
  reducers: {
    increaseCount(state, action) {
      const id = action.payload;
      const product = state.find((item) => item.id === id);
      if (product) {
        product.count += 1;
      }
    },
    // sort(state) {
    //   state.sort((a, b) => a.name.localeCompare(b.name));
    // },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});
export let { increaseCount, sort, addItem } = product.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    product: product.reducer,
    itemSort: itemSort,
  },
});
