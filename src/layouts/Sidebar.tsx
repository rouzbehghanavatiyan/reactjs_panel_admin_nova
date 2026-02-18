import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

interface SidebarProps {
  sidebarCollapsed?: boolean;
  navTitle: any;
  setNavTitle: any;
  setMobileOpen: any;
}

const menuItems = [
  { text: "داشبورد", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "محصولات عادی", icon: <Inventory2Icon />, path: "/products" },
  { text: "محصولات جدید", icon: <Inventory2Icon />, path: "/newProducts" },
  { text: "محصولات محبوب", icon: <Inventory2Icon />, path: "/popularProducts" },
  { text: "ویژگی‌ها", icon: <LocalOfferIcon />, path: "/features" },
  { text: "بنر", icon: <PeopleIcon />, path: "/cover" },
  { text: "مدیریت ثبت", icon: <BarChartIcon />, path: "/reports" },
  { text: "ثبت مشخصات", icon: <BarChartIcon />, path: "/detailsProduct" },
  { text: "تنظیمات", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({
  sidebarCollapsed,
  setMobileOpen,
  setNavTitle,
  navTitle,
}) => {
  const handleClose = (item) => {
    console.log("itemitemitemitemitemitemitemitemitemitemitem");
    setNavTitle({ text: item?.text });
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        width: sidebarCollapsed ? 60 : 240,
        bgcolor: "primary.main",
        color: "white",
        height: "100%",
        direction: "rtl",
        overflow: "auto",
      }}
    >
      <List>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={sidebarCollapsed ? item.text : ""}
            placement="right"
          >
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={() => handleClose(item)}
              sx={{
                mb: 1,
                borderRadius: 1,
                px: sidebarCollapsed ? 1.5 : 3,
                "&.active": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {!sidebarCollapsed && <ListItemText primary={item.text} />}
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: 0,
                  mr: sidebarCollapsed ? 0 : 2,
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
