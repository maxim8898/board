import { FC, useEffect, PropsWithChildren } from "react";
import { database } from '../../config/fb_config';
import { onValue, ref } from "firebase/database";
import { startSpin, setBoards } from "../../slices/boardSlice";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const BoardsInfo: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.board.loading);


  useEffect(() => {
    if (user) {
      dispatch(startSpin());

      const boardsRef = ref(database, `/boards/`);

      return onValue(boardsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          dispatch(setBoards({}))
        } else {
          dispatch(setBoards(data))
        }
      });
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 72px)",
          backgroundColor: '#F5F5F5'
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}
export default BoardsInfo;
