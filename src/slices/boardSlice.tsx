import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Board from "../interfaces/Board";
import BoardStore from "../interfaces/BoardStore";
import { set, ref } from "firebase/database";
import { database } from "../config/fb_config";

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: new Map<string, Board>(),
    active: '',
  },
  reducers: {
    addBoard: (state: BoardStore, action: PayloadAction<{id: string, board: Board}>) => {
      state.boards.set(action.payload.id, action.payload.board);
      const boardRef = ref(database, `/boards/${action.payload.id}`);
      set(boardRef, {...action.payload.board});
    },
  },
});

export const { addBoard } = boardSlice.actions;

export default boardSlice.reducer;


