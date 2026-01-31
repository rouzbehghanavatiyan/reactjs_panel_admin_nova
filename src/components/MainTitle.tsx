import React from "react";
import { Box, Typography } from "@mui/material";

interface MainTitleProps {
  title: string;
}

const MainTitle: React.FC<MainTitleProps> = ({ title }) => {
  return (
    <Box
      sx={{
        width: "100%",           
        display: "flex",         
        justifyContent: "flex-end", 
        bgcolor: "transparent",
        borderColor: "divider",
        mb: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          direction: "rtl",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default MainTitle;
