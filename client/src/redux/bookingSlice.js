import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
  from: "",
  to: "",
  date: "",
  status: "",
  error: null,
};

export const bookingSlice = createSlice({
  name: "seat-booking",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = bookingSlice.actions;

export default bookingSlice.reducer;
