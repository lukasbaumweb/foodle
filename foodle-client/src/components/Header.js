import React, { useState } from "react";

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
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import ROUTES from "../utils/routes";
import { Auth } from "../utils/auth";
import Chef from "./../assets/images/cook.svg";
import AnimatedFoodleLogo from "./AnimatedFoodleLogo";
import MenuIcon from "@mui/icons-material/Menu";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TopicIcon from "@mui/icons-material/Topic";
import CasinoIcon from "@mui/icons-material/Casino";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import SmallFoodBoy from "../assets/images/foodboy-small.png";
import SearchBar from "./SearchBar";

import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from '@mui/icons-material/Settings'; 
import LogoutIcon from "@mui/icons-material/Logout";

const MENU_ID = "primary-menu";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const auth = new Auth(window);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onNavigate = (route) => {
    handleMenuClose();
    navigate(route);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const AccountComp = (
    <>
      {auth.getUser() ? (
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={MENU_ID}
          aria-haspopup="true"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <AccountCircle />
        </IconButton>
      ) : (
        <Button
          sx={{ marginLeft: 1 }}
          variant="contained"
          color="secondary"
          startIcon={<img alt="Chef Icon" src={Chef} height="20" />}
          onClick={() => navigate(ROUTES.public.login.path)}
        >
          Login
        </Button>
      )}
    </>
  );

  const ButtonList = [
    {
      title: "Foodles",
      onClick: () => navigate(ROUTES.public.foodles.path),
      icon: <TopicIcon />,
    },
    {
      title: "Kategorien",
      onClick: () => navigate(ROUTES.public.categories.path),
      icon: <LibraryBooksIcon />,
    },
    {
      title: "Zufallsfoodle",
      onClick: () => navigate(ROUTES.public.randomFoodle.path),
      icon: <CasinoIcon />,
    },
    {
      title: "Einkaufsliste",
      onClick: () => navigate(ROUTES.private.groceryList.path),
      icon: <PlaylistAddCheckIcon />,
    },
  ];

  return (
    <>
      <span id="back-to-top-anchor" />
      <AppBar position="fixed" color="primary" enableColorOnDark>
        <Container>
          <Toolbar>
            <Box
              sx={{
                display: { md: "none", xs: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <SearchBar />
              {AccountComp}
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { sm: "block" } }}
              >
                <Link
                  to={ROUTES.home.path}
                  style={{ textDecoration: "none" }}
                  title="Homepage"
                >
                  <AnimatedFoodleLogo />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <SearchBar />
              </Box>
              <Box>
                {ButtonList.map(({ title, onClick }, index) => (
                  <Button color="inherit" onClick={onClick} key={index}>
                    {title}
                  </Button>
                ))}
                <Tooltip title="Foodle erstellen" sx={{ ml: 2 }}>
                  <IconButton
                    onClick={() => navigate(ROUTES.private.createFoodle.path)}
                    color="inherit"
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              {AccountComp}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
            <Link
              to={ROUTES.home.path}
              style={{ textDecoration: "none", display: "flex" }}
            >
              <Avatar
                sx={{ width: 50, height: 50, mr: 2 }}
                src={SmallFoodBoy}
                alt="Foodles"
              />
              <Typography sx={{ pt: 1, fontSize: 30, lineHeight: "50px" }}>
                Foodle
              </Typography>
            </Link>
          </Toolbar>
          <Divider />
          <List>
            {ButtonList.map(({ title, onClick, icon }, index) => (
              <ListItem button key={index} onClick={onClick}>
                <ListItemIcon
                  sx={{
                    color:
                      index % 2 === 0
                        ? theme.palette.primary.main
                        : theme.palette.secondary.main,
                  }}
                >
                  {icon || ""}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={MENU_ID}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => onNavigate(ROUTES.private.createFoodle.path)}>
          <AddIcon sx={{ mr: 1 }} />
          Foodle erstellen
        </MenuItem>
        <MenuItem onClick={() => onNavigate(ROUTES.private.myFoodles.path)}>
          <FolderIcon sx={{ mr: 1 }} />
          Meine Foodles
        </MenuItem>
        <MenuItem onClick={() => onNavigate(ROUTES.private.settings.path)}>
          <SettingsIcon sx={{ mr: 1 }} />
          Einstellungen
        </MenuItem>
        <MenuItem onClick={() => Auth.logout()}>
          <LogoutIcon sx={{ mr: 1 }} />
          Abmelden
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
