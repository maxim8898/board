import { FC, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { registerStart, registerSuccess, registerFailure } from "../../slices/authSlice";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Container, IconButton, Input, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useForm, Controller } from "react-hook-form";
import { FirebaseError } from "@firebase/util";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const password = watch("password");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    dispatch(registerStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      dispatch(registerSuccess(userCredential.user));
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          dispatch(registerFailure("User is already exists, please sign in"));
        }
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ py: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        {error && <Typography align="center" color="error" variant="caption" display="block">{error}</Typography>}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
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
                message: "Invalid email address",
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
                {errors.email && <Typography color="error">{errors.email.message}</Typography>}
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
                message: "Password must be at least 6 characters",
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

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            }}
            render={({ field }) => (
              <Box>
                <Input
                  {...field}
                  placeholder="Confirm Password"
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
                  error={!!errors.confirmPassword}
                  required
                />
                {errors.confirmPassword && <Typography color="error">{errors.confirmPassword.message}</Typography>}
              </Box>
            )}
          />

          <ButtonGroup variant="text" sx={{ alignSelf: "center" }}>
            <Button type="submit" disabled={loading} variant="contained">
              {loading ? "Signing up..." : "Sign up"}
            </Button>
            <Button
              disabled={loading}
              onClick={() => navigate("/login")}
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