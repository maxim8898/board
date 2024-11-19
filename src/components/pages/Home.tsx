import React from "react";
import {Box, Typography} from "@mui/material";
import {useAppSelector} from "../../hooks";
import {Navigate} from "react-router-dom";


const Home: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return(
    <>
    {!user ?
      <Navigate to='/login' /> :
      <Box p={2}>
        <Typography variant="h4">Welcome to MyApp!</Typography>
        <Typography variant="body1">
          This is a simple starting page with a top navigation bar.
        </Typography>
      </Box>
    }
    </>
  );
}

export default Home;