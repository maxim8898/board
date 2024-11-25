import { MouseEvent, useState } from "react";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import { Menu as MenuIcon, Logout as LogoutIcon, Login as LoginIcon } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { logout } from "../../slices/authSlice";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [burgerAnchorEl, setBurgerAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setBurgerAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setBurgerAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ height: '72px' }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            XBoard
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={burgerAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(burgerAnchorEl)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem key={'docs'} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>Documentations</Typography>
              </MenuItem>
            </Menu>
          </Box>


          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            XBoard
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key={'docs'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Documentations
              </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
            { user &&
              <>
                <Typography sx={{ color: 'white', marginRight: 2, display: { xs: 'none', md: 'flex' } }}>
                  {user.email}
                </Typography>
                  <IconButton onClick={handleLogout} sx={{ p: 3, color: 'white' }}>
                      <LogoutIcon />
                  </IconButton>
              </>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar;