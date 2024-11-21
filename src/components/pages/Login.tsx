import { FC, MouseEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { RootState } from "../../store";
import { loginStart, loginSuccess, loginFailure } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Container, IconButton, Input, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.auth);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(userCredential.user));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(loginFailure(err.message));
      } else {
        dispatch(loginFailure("An unexpected error occurred"));
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
            onSubmit={handleLogin}
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
            <ButtonGroup variant="text" sx={{ alignSelf: 'center' }}>
              <Button type="submit" disabled={loading} variant="contained">
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              <Button
                disabled={loading}
                onClick={() => navigate('/register')}
                variant="outlined"
              >
                Sign up
              </Button>
            </ButtonGroup>
          </Box>
        </Container>
      </Box>
  );
};

export default Login;
