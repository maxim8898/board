import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import { store } from "./store";
import { Provider } from 'react-redux'
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthContextProvider } from "./contexts/AuthContext";
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
          <ThemeProvider theme={theme}>
            <Navbar />
            <Routes>
              <Route path='/' element={
                <AuthContextProvider>
                  <Home />
                </AuthContextProvider>
              } />
              <Route path='/login' element={
                <AuthContextProvider>
                  <Login />
                </AuthContextProvider>
              } />
              <Route path='/register' element={
                <AuthContextProvider>
                  <Register />
                </AuthContextProvider>
              } />
            </Routes>
          </ThemeProvider>

      </Provider>
    </BrowserRouter>
  );
};

export default App;
