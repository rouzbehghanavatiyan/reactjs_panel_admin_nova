import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Sidebar from "./Sidebar";
import Header from "./Header";

const drawerWidth = 240;

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [navTitle, setNavTitle] = useState({ text: "" });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else setDesktopOpen(!desktopOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          position: "absolute",
          left: 0,
          right: "auto",
          ml: { sm: desktopOpen ? `${drawerWidth}px` : 0 },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          direction: "ltr",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{}}
          >
            {desktopOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Header navTitle={navTitle} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isMobile ? mobileOpen : desktopOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Sidebar
          navTitle={navTitle}
          setNavTitle={setNavTitle}
          setMobileOpen={setMobileOpen}
        />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: {
            xs: "100%",
            sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          marginRight: 0,
          marginLeft: desktopOpen && !isMobile ? `${drawerWidth}px` : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PrivateLayout;
