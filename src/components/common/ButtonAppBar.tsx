import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "../../styles/theme";
import { useAuth } from "../../contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import i18n from "../../i18n/i18n"; // Ensure your i18n is set up correctly
import { useTranslation } from "react-i18next";

const ButtonAppBar = () => {
  const { user, logout, login } = useAuth();
  const [alignment, setAlignment] = useState("Tiếng Việt");
  const { t } = useTranslation("login")

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    // Change the language based on the toggle button selected
    if (newAlignment === "Tiếng Việt") {
      i18n.changeLanguage("vi");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const loginGG = useGoogleLogin({
    onSuccess: (codeResponse) => login(codeResponse.code),
    flow: "auth-code",
  });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user) {
      logout();
    } else {
      loginGG();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          style={{
            backgroundColor: theme.color.secondary,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="success"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/list_7638998.png"
                alt="Logo"
                style={{ height: "40px", marginRight: "8px" }}
              />
              <span style={{ fontSize: "1.5rem", color: "green" }}>TodoApp</span>
            </div>
          </div>

          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Tiếng Việt">Tiếng Việt</ToggleButton>
            <ToggleButton value="English">English</ToggleButton>
          </ToggleButtonGroup>
          <Button
            color={user ? "success" : "primary"}
            onClick={handleButtonClick}
          >
            {user ? t("labels.logOut") : t("labels.logIn")}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
