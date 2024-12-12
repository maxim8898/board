import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Board, BoardStore} from "../interfaces";

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: {},
    active: '',
    loading: false,
    isModalOpen: false,
    currentModalForm: '',
  },
  reducers: {
    addBoard: (state: BoardStore, action: PayloadAction<{id: string, board: Board}>) => {
      state.boards[action.payload.id] = action.payload.board;
    },
    setBoards: (state: BoardStore, action: PayloadAction<Record<string, Board>>) => {
      state.boards = action.payload;
      state.loading = false;
    },
    setActive: (state: BoardStore, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
    startSpin(state: BoardStore) {
      state.loading = true;
    },
    stopSpin(state: BoardStore) {
      state.loading = false;
    },
    openModal(state: BoardStore, action: PayloadAction<string>) {
      state.isModalOpen = true;
      state.currentModalForm = action.payload;
    },
    closeModal(state: BoardStore) {
      state.isModalOpen = false;
      state.currentModalForm = '';
    }
  },
});

export const { addBoard,
  setActive,
  startSpin,
  stopSpin,
  setBoards,
  openModal,
  closeModal,
} = boardSlice.actions;

export default boardSlice.reducer;


