import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Checkbox,
  Button,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import Input from "./components/Input";
import { useForm } from "react-hook-form";
import Btn from "./components/Btn";

const SelectBox = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [productId, setProductId] = useState("");
  const [allFeatures, setAllFeatures] = useState<any[]>([]);
  const [pageInput, setPageInput] = useState("");
  const itemsPerPage = 50;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
  });

  const filteredData = useMemo(() => {
    if (!searchTerm) return allFeatures;
    return allFeatures.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm)
    );
  }, [allFeatures, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleGetFeatures = async () => {
    try {
      const res = await axios.get(
        "http://192.168.1.189:4000/api/feature/getAllFeatures"
      );
      if (res?.data?.code === 0) {
        setAllFeatures(res.data.data);
      } else {
        alert("خطا در دریافت ویژگی‌ها");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در ارتباط با سرور");
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageInput);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setPageInput("");
    } else {
      alert(`لطفاً عددی بین 1 و ${totalPages} وارد کنید`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleGoToPage();
  };

  const handleSend = async () => {
    try {
      const res = await axios.post(
        "http://192.168.1.189:4000/api/feature/createFeatureProduct",
        {
          productId,
          featureId: selectedIds,
        }
      );
      if (res?.data?.code === 0) {
        alert("ویژگی‌ها با موفقیت اضافه شدند");
        setSelectedIds([]);
        setProductId("");
      } else {
        alert("خطا در ارسال ویژگی‌ها");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در ارتباط با سرور");
    }
  };

  useEffect(() => {
    handleGetFeatures();
  }, []);

  useEffect(() => {
    setSelectedIds([]);
    setCurrentPage(1);
  }, [allFeatures]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Grid>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          width={"11%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          marginLeft={2}
        >
          <Btn
            variant="contained"
            color="primary"
            onClick={handleSend}
            title="ارسال ویژگی‌ها"
          />
        </Box>
        <Box  >
          <Input
            control={control}
            name="productId"
            label="آیدی محصول"
            // onChange={(e) => setProductId(e.target.value)}
            // fullWidth
          />
        </Box>
      </Box>
      <Box marginTop={2} width={"100%"}>
        <TextField
          placeholder="جستجو عنوان یا آیدی"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
        />
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) =>
                        handleSelectItem(item.id, e.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  {searchTerm ? "نتیجه‌ای یافت نشد" : "داده‌ای موجود نیست"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <Grid size={12} sx={{ mt: 2 }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <Input
                name="pageCount"
                control={control}
                type="number"
                placeholder="شماره صفحه"
              />
              <Box display={"flex"} alignItems={"center"} marginRight={1}>
                <Btn variant="contained" onClick={handleGoToPage} title="برو" />
              </Box>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                showFirstButton
                showLastButton
                color="primary"
              />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Typography>تعداد انتخاب شده: {selectedIds.length}</Typography>
            </Box>
          </Box>
          ‌
        </Grid>
      )}
    </Grid>
  );
};

export default SelectBox;

// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import {
//   Grid,
//   TextField,
//   Checkbox,
//   Button,
//   Typography,
//   Box,
// } from "@mui/material";
// import Input from "./components/Input";
// import { useForm } from "react-hook-form";
// import BaseTable, { BaseTableColumn } from "./components/BaseTable";

// const SelectBox = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [productId, setProductId] = useState("");
//   const [allFeatures, setAllFeatures] = useState<any[]>([]);
//   const [pageInput, setPageInput] = useState("");
//   const itemsPerPage = 50;
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<any>({
//     mode: "onChange",
//   });

//   console.log(allFeatures);

//   const columns: BaseTableColumn<any>[] = [
//     {
//       key: "name",
//       title: "انتخاب",
//       align: "right",
//       render: (row) => (
//         <b>
//           <Checkbox
//             checked={selectedIds.includes(row.id)}
//             onChange={(e) => handleSelectItem(row.id, e.target.checked)}
//           />
//         </b>
//       ),
//     },
//     {
//       key: "row",
//       title: "ردیف",
//       render: (_, index) => index + 1,
//     },
//     {
//       key: "title",
//       title: "ویژگی",
//       align: "right",
//       render: (row) => <b>{row.title}</b>,
//     },
//   ];

//   const filteredData = useMemo(() => {
//     if (!searchTerm) return allFeatures;
//     return allFeatures.filter(
//       (item) =>
//         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.id.toString().includes(searchTerm)
//     );
//   }, [allFeatures, searchTerm]);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const currentData = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return filteredData.slice(startIndex, endIndex);
//   }, [filteredData, currentPage]);

//   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       const currentPageIds = currentData.map((item) => item.id);
//       const newSelectedIds = [...new Set([...selectedIds, ...currentPageIds])];
//       setSelectedIds(newSelectedIds);
//     } else {
//       const currentPageIds = currentData.map((item) => item.id);
//       setSelectedIds(selectedIds.filter((id) => !currentPageIds.includes(id)));
//     }
//   };

//   const handleSelectItem = (id: number, checked: boolean) => {
//     if (checked) {
//       setSelectedIds((prev) => [...prev, id]);
//     } else {
//       setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
//     }
//   };

//   const handleGetFeatures = async () => {
//     try {
//       const res = await axios.get(
//         "http://192.168.1.189:4000/api/feature/getAllFeatures"
//       );
//       if (res?.data?.code === 0) {
//         setAllFeatures(res.data.data);
//       } else {
//         alert("خطا در دریافت ویژگی‌ها");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("خطا در ارتباط با سرور");
//     }
//   };

//   const handleGoToPage = () => {
//     const pageNumber = parseInt(pageInput);
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//       setPageInput("");
//     } else {
//       alert(`لطفاً عددی بین 1 و ${totalPages} وارد کنید`);
//     }
//   };

//   const handleSend = async () => {
//     try {
//       const res = await axios.post(
//         "http://192.168.1.189:4000/api/feature/createFeatureProduct",
//         {
//           productId,
//           featureId: selectedIds,
//         }
//       );
//       if (res?.data?.code === 0) {
//         alert("ویژگی‌ها با موفقیت اضافه شدند");
//         setSelectedIds([]);
//         setProductId("");
//       } else {
//         alert("خطا در ارسال ویژگی‌ها");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("خطا در ارتباط با سرور");
//     }
//   };

//   useEffect(() => {
//     handleGetFeatures();
//   }, []);

//   useEffect(() => {
//     setSelectedIds([]);
//     setCurrentPage(1);
//   }, [allFeatures]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   const isAllSelected =
//     currentData.length > 0 &&
//     currentData.every((item) => selectedIds.includes(item.id));

//   return (
//     <Grid container spacing={2}>
//       <Input control={control} name="productId" label="آیدی محصول" />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSend}
//         disabled={!productId || selectedIds.length === 0}
//         fullWidth
//       >
//         ارسال ویژگی‌ها
//       </Button>
//       <TextField
//         placeholder="جستجو عنوان"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         fullWidth
//         size="small"
//       />
//       {/* <TableBody>
//               {currentData.length > 0 ? (
//                 currentData.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedIds.includes(item.id)}
//                         onChange={(e) =>
//                           handleSelectItem(item.id, e.target.checked)
//                         }
//                       />
//                     </TableCell>
//                     <TableCell>{item.id}</TableCell>
//                     <TableCell>{item.title}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     {searchTerm ? "نتیجه‌ای یافت نشد" : "داده‌ای موجود نیست"}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody> */}
//       {totalPages > 1 && (
//         <Grid size={12} sx={{ mt: 4 }}>
//           {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={(e, page) => setCurrentPage(page)}
//               showFirstButton
//               showLastButton
//               color="primary"
//             />
//           </Box> */}

//           <BaseTable columns={columns} rows={currentData || []} />
//           <Grid my={2} justifyContent={"center"} display={"flex"}>
//             <Typography>تعداد انتخاب شده: {selectedIds.length}</Typography>
//           </Grid>
//           <Box justifyContent={""} display={"flex"} marginTop={2} px={5}>
//             <Grid size={12}>
//               <Input
//                 name="pageInput"
//                 control={control}
//                 type="number"
//                 placeholder="شماره صفحه"
//                 // onKeyPress={handleKeyPress}
//                 // sx={{
//                 //   width: 120,
//                 //   "& .MuiInputBase-input": {
//                 //     textAlign: "center",
//                 //   },
//                 // }}
//                 // inputProps={{
//                 //   min: 1,
//                 //   max: totalPages,
//                 //   style: { textAlign: "center" },
//                 // }}
//                 // size="small"
//               />
//             </Grid>
//             <Button
//               variant="contained"
//               onClick={handleGoToPage}
//               sx={{
//                 ml: 2,
//                 minWidth: 80,
//               }}
//               size="small"
//             >
//               برو
//             </Button>
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// };

// export default SelectBox;
