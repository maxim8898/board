import { FC } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/nav";
import { store } from "./store";
import { Provider } from 'react-redux';
import { Login, Register, Home, RestrictedRoute, NonRestrictedRoute } from "./components/pages";
import BoardsInfo from "./components/pages/BoardsInfo";
import BoardProvider from "./BoardProvider";

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
        <BoardProvider>
          <ThemeProvider theme={theme}>
              <Navbar />
              <Routes>
                <Route path='/' element={
                  <RestrictedRoute>
                    <BoardsInfo>
                      <Home />
                    </BoardsInfo>
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
        </BoardProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
