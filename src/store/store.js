import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js";
import sortSlice from "./sortSlice.js";
import product from "./productSlice.js";

export default configureStore({
  reducer: {
    user: user.reducer,
    product: product.reducer,
    sortSlice: sortSlice,
  },
});
