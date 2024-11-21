import { ReactElement, FC, useLayoutEffect } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

interface NonRestrictedRouteProps {
  children: ReactElement,
}

export const NonRestrictedRoute: FC<NonRestrictedRouteProps> = ({ children }: NonRestrictedRouteProps) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess({
          email: user.email,
          uid: user.uid,
        }));
        navigate('/');
      } else {
        dispatch(logout());
      }
    })

    return () => { unsubscribe() }
  }, [dispatch, auth, navigate]);

  return (
    <>
      { children }
    </>
  )
}
export default NonRestrictedRoute;
