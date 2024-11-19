import React from "react";
import {AppBar, MenuItem, Select, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../hooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={'/'}>XBoard</Link>
        </Typography>

        <Select
          displayEmpty
          sx={{ marginRight: 2, color: 'white' }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ru">Русский</MenuItem>
        </Select>
        {user && <span>{user.email}</span>}
        {!user && <Link to={'/login'}>Login</Link>}
        <LogoutButton />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;