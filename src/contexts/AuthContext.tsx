import { createContext } from "react";
import User from "../interfaces/User";
import React, { ReactElement, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useDispatch} from "react-redux";
import {loginFailure, loginSuccess} from "../slices/authSlice";

const AuthContext = createContext<User>({email: null, uid: ''});

interface AuthContextProviderProps {
  children: ReactElement,
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>({email: null, uid: ''});
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess({
          email: user.email,
          uid: user.uid,
        }))
      } else {
        dispatch(loginFailure("error"));
      }
    })
  }, []);

  return (
    <AuthContext.Provider value={user}>
      { children }
    </AuthContext.Provider>
  )
}
export default AuthContext;
