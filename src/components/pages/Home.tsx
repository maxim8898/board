import { FC } from "react";
import { Box, Typography } from "@mui/material";


export const Home: FC = () => {
  return(
    <Box p={2} sx={{ minHeight: 'calc(100vh - 72px)' }}>
      <Typography variant="h4">Welcome to MyApp!</Typography>
      <Typography variant="body1">
        This is a simple starting page with a top navigation bar.
      </Typography>
    </Box>
  );
}

export default Home;