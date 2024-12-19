import { FC } from "react";
import { Container } from "@mui/material";
import { Board } from "../ui";

export const Home: FC = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Board />
      </Container>
    </>
  );
}

export default Home;