// store.js
import { configureStore } from "@reduxjs/toolkit";
import bookingSliceReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    booking: bookingSliceReducer,
  },
});

export default store;
