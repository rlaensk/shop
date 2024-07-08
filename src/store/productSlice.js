import { createSlice } from "@reduxjs/toolkit";

let product = createSlice({
  name: "product",
  initialState: [],
  reducers: {
    increaseCount(state, action) {
      const id = action.payload;
      const product = state.find((item) => item.id === id);
      if (product) {
        product.count += 1;
      }
    },
    sort(state) {
      state.sort((a, b) => a.name.localeCompare(b.name));
    },
    addItem: (state, action) => {
      let addItemlocal = localStorage.setItem(
        "products",
        JSON.stringify(action.payload)
      );
      state.push(addItemlocal);
      // localStorage에 저장하기
    },
    deleteItem(state, action) {
      state.pop(action.payload);
    },
  },
});
export let { increaseCount, sort, addItem, deleteItem } = product.actions;
export default product;
