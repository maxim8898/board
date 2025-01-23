import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseError } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { RootState } from "../../store";
import { loginStart, loginSuccess, loginFailure } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Container, IconButton, Input, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data: LoginFormInputs) => {
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(loginSuccess({...userCredential.user, name: null, avatar: null}));
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/invalid-credential') {
          dispatch(loginFailure("Invalid email or password"));
        }
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>Sign In</Typography>
        {error && <Typography align="center" color="error" variant="caption" display="block">{error}</Typography>}
        <Box
          component="form"
          sx={{'& > :not(style)': {m: 1}, display: 'flex', flexDirection: 'column'}}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Box>
                <Input
                  {...field}
                  placeholder="Email"
                  fullWidth
                  sx={{
                    border: errors.email ? "1px solid red" : "1px solid #ccc",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                  error={!!errors.email}
                  required
                />
                {errors.email && <Typography color="error" variant="caption">{errors.email.message}</Typography>}
              </Box>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            render={({ field }) => (
              <Box>
                <Input
                  {...field}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  sx={{
                    border: errors.password ? "1px solid red" : "1px solid #ccc",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!errors.password}
                  required
                />
                {errors.password && <Typography color="error" variant="caption">{errors.password.message}</Typography>}
              </Box>
            )}
          />

          <ButtonGroup variant="text" sx={{ alignSelf: "center" }}>
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
