import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { registerStart, registerSuccess, registerFailure } from "../../slices/authSlice";
import {useAppDispatch} from "../../hooks";
import {redirect} from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(registerStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(registerSuccess(userCredential.user));
      redirect('/');
    } catch (err) {
      if (err instanceof Error) {
        dispatch(registerFailure(err.message));
      } else {
        dispatch(registerFailure("An unexpected error occurred"));
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
