import React from "react";
import {AppBar, MenuItem, Select, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Navbar = () => {
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
        <Link to={'/login'}>Login</Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;