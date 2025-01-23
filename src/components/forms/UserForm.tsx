import { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button, Grid, FormControlLabel, Radio, Input, Container } from "@mui/material";
import { set, ref } from "firebase/database";
import { database } from "../../config/fb_config";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUser } from "../../slices/authSlice";
import { ProfileAvatar } from "../ui/ProfileAvatar";
import avatars from "../../config/avatars";

interface UserFormInputs {
  email: string | null;
  name: string | null;
  avatar: string | null;
}

export const UserForm: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormInputs>({
    defaultValues: {
      avatar: user ? user.avatar : "default",
      email: user ? user.email : null,
      name: user ? user.name : null,
    },
  });

  const selectedAvatar = watch("avatar");

  const onSubmit = async (data: UserFormInputs) => {
    if (user) {
      const uid = user.uid;
      const usersRef = ref(database, `/users/${uid}`);
      const updatedUser = {
        ...user,
        avatar: data.avatar,
        name: data.name,
        email: data.email,
      };
      await set(usersRef, { ...updatedUser });
      dispatch(setUser(updatedUser));
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F5F5F5',
        py: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ py: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>Profile</Typography>
        {/*{errors && <Typography align="center" color="error" variant="caption" display="block">{errors.}</Typography>}*/}
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1 }, display: "flex", flexDirection: "column" }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >

          <Input
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                message: "Invalid name format",
              },
            })}
            placeholder="Name"
            fullWidth
            sx={{
              border: errors.email ? "1px solid red" : "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
            }}
            required
          />

          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
            fullWidth
            sx={{
              border: errors.email ? "1px solid red" : "1px solid #ccc",
              padding: "8px",
              borderRadius: "4px",
            }}
            required
          />

          <Grid container spacing={2}>
            {Object.keys(avatars).map((name) => (
              <Grid item key={name}>
                <FormControlLabel
                  value={name}
                  control={
                    <Radio
                      {...register("avatar")}
                      sx={{ display: "none" }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        borderRadius: "50%",
                        overflow: "hidden",
                        boxShadow: selectedAvatar === name ? "0 0 6px 6px rgb(166 166 166)" : "none",
                        transition: "box-shadow 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <ProfileAvatar alt={`avatar ${name}`} name={name} />
                    </Box>
                  }
                />
              </Grid>
            ))}
          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UserForm;
