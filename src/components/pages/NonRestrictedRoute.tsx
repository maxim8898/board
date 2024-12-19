import { FC, useEffect, PropsWithChildren } from "react";
import { auth } from '../../config/fb_config';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, startSpin, stopSpin } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Box, CircularProgress } from "@mui/material";

export const NonRestrictedRoute: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(startSpin());

    return auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess({
          email: user.email,
          uid: user.uid,
        }));
        navigate('/');
      } else {
        dispatch(logout());
        dispatch(stopSpin());
      }
    })
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
export default NonRestrictedRoute;
