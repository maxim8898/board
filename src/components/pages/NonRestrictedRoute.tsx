import { ReactElement, FC, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, startSpin, stopSpin } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Box, CircularProgress } from "@mui/material";

interface NonRestrictedRouteProps {
  children: ReactElement,
}

export const NonRestrictedRoute: FC<NonRestrictedRouteProps> = ({ children }: NonRestrictedRouteProps) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(startSpin());

    const unsubscribe = auth.onAuthStateChanged((user) => {
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

    return () => { unsubscribe() }
  }, [dispatch, auth, navigate]);

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
