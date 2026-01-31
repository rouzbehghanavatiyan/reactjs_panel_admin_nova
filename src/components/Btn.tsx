import React from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useAppSelector } from "../hooks/store/typeSlice";

interface BtnProps {
  title?: string;
  name?: string;
  loadingName?: string | null;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
}

const Btn: React.FC<BtnProps> = ({
  title = "",
  name = "",
  loadingName = null,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  className = "",
  icon,
  onClick,
  color = "primary",
  variant = "contained",
  fullWidth = true,
}) => {
  const main = useAppSelector((state) => state.main);

  const isLoading = main.showLoading?.btnName === loadingName;

  return (
    <Grid
      item
      size={{ xs: { xs }, sm: { sm }, md: { md }, lg: { lg }, xl: { xl } }}
    >
      <Button
        name={name}
        onClick={onClick}
        color={color}
        variant={variant}
        disabled={isLoading}
        fullWidth={fullWidth}
        className={className}
        endIcon={
          icon && !isLoading ? (
            <span style={{ display: "flex", marginLeft: 4 }}>{icon}</span> // فاصله 8px
          ) : undefined
        }
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : title}
      </Button>
    </Grid>
  );
};

export default Btn;
