import { configureStore } from '@reduxjs/toolkit'
import boardReducer from "./slices/boardSlice";
import authReducer from "./slices/authSlice";
import {enableMapSet} from "immer";
enableMapSet();

export const store = configureStore({
  reducer: {
    board: boardReducer,
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
