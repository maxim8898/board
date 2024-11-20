import { createContext } from "react";
import User from "../interfaces/User";
import React, { ReactElement, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<User>({email: null, uid: ''});

interface AuthContextProviderProps {
  children: ReactElement,
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>({email: null, uid: ''});
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess({
          email: user.email,
          uid: user.uid,
        }));
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        navigate('/login');
      }
    })
  }, [user, dispatch, auth, navigate]);

  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  )
}
export default AuthContext;
