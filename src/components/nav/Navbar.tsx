import { MouseEvent, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton, InputLabel,
  Menu,
  MenuItem, Select, SelectChangeEvent,
  Toolbar,
  Typography
} from "@mui/material";
import { useAppSelector } from "../../hooks";
import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/fb_config";
import { logout } from "../../slices/authSlice";
import { closeModal, openModal, setActive } from "../../slices/boardSlice";
import { Board } from "../../interfaces";
import { Modal } from "../ui";
import { BoardForm } from "../forms";

export const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const {boards, active, isModalOpen, currentModalForm} = useAppSelector((state) => state.board);
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

  const handleBoardChange = (event: SelectChangeEvent<string>) => {
    dispatch(setActive(event.target.value));
  }

  const openBoardModal = () => {
    dispatch(openModal({formId: 'boardForm'}));
  }

  return (
    <>
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
            { user &&
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <FormControl variant="outlined" size="small" sx={{ my: 2, color: 'white', minWidth: 150 }}>
                        <InputLabel id="select-label" sx={{ color: 'white' }}>Board</InputLabel>
                        <Select
                            labelId="select-label"
                            value={active}
                            onChange={handleBoardChange}
                            label="Board"
                            sx={{ color: 'white' }}
                        >
                          { boards &&
                            Object.entries(boards as Record<string, Board>).map(([id, board]: [string, Board]) => (
                              <MenuItem key={id} value={id}>
                                {board.name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                    </FormControl>
                    <Button
                        key={'add-board'}
                        onClick={openBoardModal}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Add Board
                    </Button>
                </Box>
            }
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
                    { user.email }
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
      { isModalOpen && currentModalForm === 'boardForm' &&
        <Modal open={ isModalOpen } onClose={() => dispatch(closeModal())}>
          <BoardForm />
        </Modal>
      }
    </>
  )
}

export default Navbar;