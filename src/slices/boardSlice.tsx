import React from "react";
import { createSlice } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: [],
  },
  reducers: {
    addBoard: (state) => {
      state.boards = [];
    },
  },
});

export const { addBoard } = boardSlice.actions;

export default boardSlice.reducer;


