import React from 'react';
import { Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import store from "./store";
import { Provider } from 'react-redux'

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#222221"
        }
      }
    }
  }
});

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navbar />

          <Routes>
            <Route path='/' element={
              <Box p={2}>
                <Typography variant="h4">Welcome to MyApp!</Typography>
                <Typography variant="body1">
                  This is a simple starting page with a top navigation bar.
                </Typography>
              </Box>
            } />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
