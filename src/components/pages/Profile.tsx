import { FC } from "react";
import { Container } from "@mui/material";
import { UserForm } from "../forms";

export const Profile: FC = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <UserForm />
      </Container>
    </>
  );
}

export default Profile;