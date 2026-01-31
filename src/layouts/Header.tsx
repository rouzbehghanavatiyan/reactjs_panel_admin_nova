import React from "react";
import { Toolbar, Typography, Box, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header: React.FC<any> = ({ navTitle }) => {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography color="textPrimary" component="div">
          {navTitle?.text}
        </Typography>
        <Typography variant="h6" color="white" component="div">
          پنل مدیریت فروشگاه
        </Typography>
        <AccountCircleIcon sx={{ width: "50px", height: "50px" }} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Divider orientation="vertical" flexItem />
      </Box>
    </Toolbar>
  );
};

export default Header;
