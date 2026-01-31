import React from "react";
import { IconButton, Box } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, newPage: number) => void;
}

export default function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(count / rowsPerPage);

  const getMiddlePages = () => {
    const pages = [];
    const start = Math.max(0, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, page - 1)}
        disabled={page === 0}
      >
        <ChevronLeftIcon />
      </IconButton>
 
      <IconButton
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page >= totalPages - 1}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, totalPages - 1)}
        disabled={page >= totalPages - 1}
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}
