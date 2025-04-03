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
import { Modal, ProfileAvatar } from "../ui";
import { BoardForm } from "../forms";
import { useNavigate } from "react-router-dom";
import boardForm from "../forms/BoardForm";

interface BoardFormProps {
  id?: string,
  name?: string,
  owner?: string,
  contributors?: string[],
  formMode: 'create' | 'edit',
}

export const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const {boards, active, isModalOpen, currentModalForm} = useAppSelector((state) => state.board);
  const [burgerAnchorEl, setBurgerAnchorEl] = useState<null | HTMLElement>(null);
  const [boardFormProps, setBoardFormProps] = useState<BoardFormProps>({
    formMode: 'create',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const openBoardModal = (formMode: 'create' | 'edit', boardId?: string) => {
    switch (formMode) {
      case 'create':
        setBoardFormProps(prevState => ({
          ...prevState,
          id: undefined,
          name: undefined,
          owner: undefined,
          contributors: undefined,
        }));
        dispatch(openModal({formId: 'boardForm'}));
        break;

      case 'edit':
        if (boardId) {
          const board = boards[boardId];
          setBoardFormProps(prevState => ({
            ...prevState,
            id: boardId,
            name: board['name'],
            owner: board['owner'],
            contributors: board['contributors'],
          }));
          dispatch(openModal({formId: 'boardForm'}));
        }
        break;
    }
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

                    { active && boards && boards[active].owner == user.uid  &&
                        <Button
                            key={'board-settings'}
                            onClick={() => openBoardModal('edit', active)}
                            sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}
                        >
                            Settings
                        </Button>
                    }

                    <Button
                        key={'add-board'}
                        onClick={() => openBoardModal('create')}
                        sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}
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
                  <Typography onClick={() => {navigate('/profile')}} sx={{ color: 'white', marginRight: 2, display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
                    { user.name }
                  </Typography>

                  <ProfileAvatar alt='avatar' name={user.avatar ? user.avatar : 'default'} />

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
          <BoardForm
            id = { boardFormProps.id }
            name = { boardFormProps.name }
            owner = { boardFormProps.owner }
            contributors = { boardFormProps.contributors }
            formMode = { boardFormProps.formMode }
          />
        </Modal>
      }
    </>
  )
}

export default Navbar;