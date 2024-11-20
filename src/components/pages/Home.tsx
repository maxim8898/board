import React from "react";
import {Box, Typography} from "@mui/material";


const Home: React.FC = () => {
  return(
    <Box p={2}>
      <Typography variant="h4">Welcome to MyApp!</Typography>
      <Typography variant="body1">
        This is a simple starting page with a top navigation bar.
      </Typography>
    </Box>
  );
}

export default Home;