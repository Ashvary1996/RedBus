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
  
  },
});

export const { } = bookingSlice.actions;

export default bookingSlice.reducer;
