import React, { useState } from "react";

import AccountCircle from "@mui/icons-material/AccountCircle";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../utils/routes";
import { Auth } from "../utils/auth";
import Chef from "./../assets/images/cook.svg";
import AnimatedFoodleLogo from "./AnimatedFoodleLogo";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const auth = new Auth(window);

  const navigate = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onNavigate = (route) => {
    navigate(route);
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";

  return (
    <>
      <span id="back-to-top-anchor" />
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link
                to={ROUTES.home.path}
                style={{ textDecoration: "none" }}
                title="Homepage"
              >
                <AnimatedFoodleLogo />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <Button
                color="inherit"
                onClick={() => navigate(ROUTES.public.recipes.path)}
              >
                Rezepte
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(ROUTES.public.cookingBooks.path)}
              >
                Kochbücher
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(ROUTES.public.randomRecipe.path)}
              >
                Zufallsrezept
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(ROUTES.public.groceryList.path)}
              >
                Einkaufsliste
              </Button>

              {auth.getUser() ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                <Button
                  sx={{ marginLeft: 1 }}
                  variant="contained"
                  startIcon={<img alt="Chef Icon" src={Chef} height="20" />}
                  onClick={() => navigate(ROUTES.public.login.path)}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => onNavigate(ROUTES.private.account.path)}>
          Account
        </MenuItem>
        <MenuItem onClick={() => onNavigate(ROUTES.private.settings.path)}>
          Einstellungen
        </MenuItem>
        <MenuItem onClick={Auth.logout}>Abmelden</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
