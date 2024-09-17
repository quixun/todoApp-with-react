import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "../../styles/theme";
import { useAuth } from "../../contexts/AuthContext";

const ButtonAppBar = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: theme.color.secondary }}>
          <IconButton
            size="large"
            edge="start"
            color="success"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {user ? (
            <Button color="success" onClick={logout}>
              Sign out
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
