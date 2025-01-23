import { FC, useEffect, PropsWithChildren } from "react";
import { auth, database } from '../../config/fb_config';
import { useDispatch, useSelector } from "react-redux";
import { startSpin, stopSpin, loginSuccess } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Box, CircularProgress } from "@mui/material";
import { onValue, ref } from "firebase/database";

export const RestrictedRoute: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(startSpin());
        const usersRef = ref(database, `/users/${user.uid}`);

        onValue(
          usersRef,
          (snapshot) => {
            const userData = snapshot.val(); // Данные из Realtime Database
            dispatch(
              loginSuccess({
                email: user.email,
                uid: user.uid,
                name: userData?.name || null,
                avatar: userData?.avatar || null,
              })
            );
            dispatch(stopSpin());
          },
          { onlyOnce: true }
        );
      } else {
        dispatch(stopSpin());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

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
export default RestrictedRoute;
