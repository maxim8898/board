import { FC, MouseEvent, FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { registerStart, registerSuccess, registerFailure } from "../../slices/authSlice";
import { useAppDispatch } from "../../hooks";
import { redirect, useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Container, IconButton, Input, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRegister = async (e: FormEvent) => {
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
    <Box
      sx={{
        backgroundColor: '#F5F5F5',
        minHeight: 'calc(100vh - 72px)',
      }}
    >
      <Container maxWidth="xl" sx={{ justifyItems: 'center', py: 3 }}>
        <Box
          component="form"
          sx={{'& > :not(style)': {m: 1}, display: 'flex', flexDirection: 'column'}}
          noValidate
          autoComplete="off"
          onSubmit={handleRegister}
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
            required
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
            required
          />
          <ButtonGroup variant="text" sx={{ alignSelf: 'center' }}>
            <Button type="submit" disabled={loading} variant="contained">
              {loading ? "Signing up..." : "Sign up"}
            </Button>
            <Button
              disabled={loading}
              onClick={() => navigate('/login')}
              variant="outlined"
            >
              Sign in
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
