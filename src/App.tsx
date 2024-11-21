import { FC } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/nav";
import { store } from "./store";
import { Provider } from 'react-redux';
import { Login, Register, Home, RestrictedRoute, NonRestrictedRoute } from "./components/pages";

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

const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Routes>
              <Route path='/' element={
                <RestrictedRoute>
                  <Home />
                </RestrictedRoute>
              } />
              <Route path='/login' element={
                <NonRestrictedRoute>
                  <Login />
                </NonRestrictedRoute>
              } />
              <Route path='/register' element={
                <NonRestrictedRoute>
                  <Register />
                </NonRestrictedRoute>
              } />
            </Routes>
          </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
