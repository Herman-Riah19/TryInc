import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "@inertiajs/inertia-react";
import {
  Explore,
  Logout,
  Person,
  RecentActors,
  Settings,
  Facebook,
  Instagram,
  MoreVert,
  Info,
  AddBox,
  RssFeed,
  Notifications,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchInput from "./SearchInput";
import CardNotification from "../Card/CardNotification";

const Navbar = ({ auth, authAvatar, keyWord }) => {
  const isLoggedIn = auth.guards.web.isLoggedIn;
  const pages = [
    {
      title: "Explores",
      icon: <Explore />,
      link: "/explores",
    },
    {
      title: "Artists",
      icon: <RecentActors />,
      link: "/artist-list",
    },
    {
      title: "Blogs",
      icon: <RssFeed />,
      link: "/posts",
    },
    {
      title: "Publish",
      icon: <AddBox />,
      link: isLoggedIn ? "/product/create/" : "/auth/login",
    },
  ];

  const [anchorE, setAnchorE] = useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);


  const handleMenu = (event) => {
    setAnchorE(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE(null);
  };

  const handleMenuNotification = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorNotification(null);
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [moreMenu, setMoreMenu] = useState(null);
  const MoreButtonOpen = Boolean(moreMenu);

  const handleMoreButtonClick = (event) => {
    setMoreMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMoreMenu(null);
  };

  return (
      <AppBar sx={{  bgcolor: "#18181C" }}>
        <Toolbar sx={{ p: "0" }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: "none", color: "#fff" }}>
              <Avatar
                sx={{ height: "50px", width: "50px" }}
                src={"/favicon.svg"}
              />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              sx={{ color: "white" }}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    href={page.link}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                variant="text"
                sx={{ ml: 5, color: "#fff" }}
                startIcon={page.icon}
              >
                <Link
                  href={page.link}
                  style={{ textDecoration: "none", color: "#fff", textTransform:"capitalize", fontWeight: '200' }}
                >
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>
          <Box>
            <SearchInput keyWord={keyWord} />
          </Box>
          <Box>
            {isLoggedIn ? (
              <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuNotification}
                sx={{ color: "white" }}
              >
                <Notifications />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorNotification}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorNotification)}
                onClose={handleCloseNotification}
                sx={{ width: "40vw", mt: "50px", p: "5px" }}
              >
                <Link
                  href={`/profile/${auth.guards.web.user.username
                    .split(" ")
                    .join("_")}`}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <MenuItem sx={{width: "500px"}}>
                    <CardNotification />
                  </MenuItem>
                </Link>
              </Menu>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {authAvatar ? (
                    <Avatar
                      sx={{ alignItems: "center", bgcolor: "red", width: "30px", height: "30px" }}
                      src={authAvatar}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorE}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorE)}
                  onClose={handleClose}
                  sx={{ mt: "50px", p: "10px" }}
                >
                  <Link
                    href={`/profile/${auth.guards.web.user.username
                      .split(" ")
                      .join("_")}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <MenuItem>
                      {" "}
                      <Person sx={{ mr: "10px", width: "20px" }} /> Profile
                    </MenuItem>
                  </Link>
                  <Link href={`/profile/edit/${auth.guards.web.user.id}`}>
                    <MenuItem onClick={handleClose} sx={{ color: "#fff" }}>
                      {" "}
                      <Settings sx={{ mr: "10px", width: "20px" }} /> Setting
                    </MenuItem>
                  </Link>
                  <Link
                    href="/auth/logout"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <MenuItem>
                      {" "}
                      <Logout sx={{ mr: "10px", width: "20px" }} /> Logout
                    </MenuItem>
                  </Link>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Link href="/auth/login" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{ marginTop: "0", marginLeft: "5px", height: "100%" }}
                    variant="contained"
                    color="secondary"
                  >
                    Connected
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
          <Box>
            <IconButton
              id="more-button"
              aria-controls={MoreButtonOpen ? "basic-menu" : undefined}
              aria-haspopup="true"
              color="primary"
              variant="contained"
              aria-expanded={MoreButtonOpen ? "true" : undefined}
              onClick={handleMoreButtonClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="more-menu"
              anchorEl={moreMenu}
              open={MoreButtonOpen}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link
                href={`https://www.facebook.com/profile.php?id=100072431139370`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem>
                  <Info sx={{ mr: "10px", width: "20px" }} /> About Trinkz
                </MenuItem>
              </Link>
              <a
                href={`https://www.facebook.com/profile.php?id=100072431139370`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem>
                  <Facebook sx={{ mr: "10px", width: "20px" }} /> Facebook
                </MenuItem>
              </a>
              <a
                href={`https://www.instagram.com/hermannchrist19/`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem>
                  <Instagram sx={{ mr: "10px", width: "20px" }} /> Instagram
                </MenuItem>
              </a>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
