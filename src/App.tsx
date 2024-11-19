import React from 'react';
import { Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import { store } from "./store";
import { Provider } from 'react-redux'
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import {AuthContextProvider} from "./contexts/AuthContext";
import {useAppSelector} from "./hooks";
import Home from "./components/pages/Home";

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
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Routes>
              <Route path='/' element={
                <Home />
              } />
              <Route path='/login' element={
                <Login />
              } />
              <Route path='/register' element={
                <Register />
              } />
            </Routes>
          </ThemeProvider>
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
