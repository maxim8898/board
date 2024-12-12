import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Board, BoardStore} from "../interfaces";

const initialState: BoardStore = {
  boards: {},
  active: 'd25a309a-60c4-49c7-acd6-40149feed84d',
  loading: false,
  isModalOpen: false,
  currentModalForm: '',
}

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
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
    openModal(state: BoardStore, action: PayloadAction<{ formId: string, formProps?: any }>) {
      state.isModalOpen = true;
      state.currentModalForm = action.payload.formId;
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


