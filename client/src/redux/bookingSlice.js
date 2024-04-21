import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
  from: "",
  to: "",
  date: "",
  status: "comingFromRedux",
  error: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCities: (state, action) => {
      // console.log("Updating cities with redux:", action.payload);
      state.cities = action.payload;
    },
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
      // console.log("state.to",state.to);
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setCities, setFrom, setTo, setDate, setError, setStatus } =
  bookingSlice.actions;

export default bookingSlice.reducer;
