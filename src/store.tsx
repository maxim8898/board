import { configureStore } from '@reduxjs/toolkit'
import boardReducer from "./slices/boardSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
  },
})
