import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";
import TablePaginationActions from "./TablePaginationActions";

export interface BaseTableColumn<T> {
  key: string;
  title: string;
  align?: "left" | "right" | "center";
  render?: (row: T, index: number) => React.ReactNode;
}

interface BaseTableProps<T> {
  columns: BaseTableColumn<T>[];
  rows: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  emptyText?: string;
  isFilteredRows?: boolean;
}

function BaseTable<T>({
  columns,
  rows,
  isFilteredRows = true,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10,
  emptyText = "آیتمی برای نمایش وجود ندارد",
}: BaseTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // const paginatedRows = useMemo(() => {
  //   const start = page * rowsPerPage;
  //   return rows.slice(start, start + rowsPerPage);
  // }, [rows, page, rowsPerPage]);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      columns.every((col) => {
        if (!filters[col.key]) return true;
        // @ts-ignore
        return String(row[col.key] ?? "")
          .toLowerCase()
          .includes(filters[col.key].toLowerCase());
      }),
    );
  }, [rows, filters, columns]);

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredRows.slice(start, start + rowsPerPage);
  }, [filteredRows, page, rowsPerPage]);

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: 640 }} dir="rtl">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align || "center"}
                  sx={{
                    backgroundColor: "#e3f2fd",
                    fontWeight: "bold",
                    borderBottom: "1px solid #bbdefb",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{col.title}</div>
                  {isFilteredRows && (
                    <TextField
                      style={{
                        width: "100%",
                        marginTop: 1,
                        fontSize: 5,
                      }}
                      placeholder="جستجو . . . "
                      value={filters[col.key] || ""}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [col.key]: e.target.value,
                        }))
                      }
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  hover
                  sx={{
                    py: "1px",
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f5f5f5ff",
                    },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align={col.align || "center"}
                      sx={{ py: "4px" }}
                    >
                      {col.render
                        ? col.render(row, page * rowsPerPage + rowIndex)
                        : // @ts-ignore
                          row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {emptyText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        labelRowsPerPage=""
        labelDisplayedRows={() => ""}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
}

export default BaseTable;
