import { ReactElement, FC, useLayoutEffect } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

interface RestrictedRouteProps {
  children: ReactElement,
}

export const RestrictedRoute: FC<RestrictedRouteProps> = ({ children }: RestrictedRouteProps) => {
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
      } else {
        navigate('/login');
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
export default RestrictedRoute;
