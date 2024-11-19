// src/components/LogoutButton.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { logout } from "../../slices/authSlice";
import {redirect} from "react-router-dom";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    redirect('/');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
