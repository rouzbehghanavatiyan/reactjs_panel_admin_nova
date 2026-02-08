import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Btn from "../../components/Btn";
import Modal from "../../components/Modal";
import AddIcon from "@mui/icons-material/Add";
import { deleteNewProduct, getNewProduct } from "../../services";
import StringHelpers from "../../utils/StringHelper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteConfirmDialog from "../../components/DeleteModal";
import { useToast } from "../../components/Toastify";
import AddNewProduct from "./AddNewProduct";
import BaseTable, { BaseTableColumn } from "../../components/BaseTable";

const NewProduct = () => {
  const toast = useToast();
  const [showAddNewProduct, setShowAddNewProduct] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [allNewProduct, setAllNewProduct] = useState([]);

  const handleOpenDelete = (product: any) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct?.code) return;

    try {
      const res = await deleteNewProduct(selectedProduct.code);
      if (res?.code === 0) {
        toast.success("محصول با موفقیت حذف شد");
      } else {
        toast.error("خطا در حذف محصول");
      }
    } catch (error) {
      console.error(error);
      toast.error("مشکلی در ارتباط با سرور رخ داد");
    }
  };

  const handleGetNewProduct = async () => {
    try {
      const res: any = await getNewProduct();
      console.log(res);

      setAllNewProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetNewProduct();
  }, []);

  const columns: BaseTableColumn<any>[] = [
    {
      key: "row",
      title: "ردیف",
      render: (_, index) => index + 1,
    },
    {
      key: "image",
      title: "تصویر",
      render: (row) => {
        return (
          <img
            src={StringHelpers.getProfile(row.attachments[0], row?.code)}
            width={100}
            height={100}
            loading="lazy"
          />
        );
      },
    },
    {
      key: "name",
      title: "نام محصول",
      align: "center",
    },
    {
      key: "code",
      title: "کد محصول",
      render: (row) => <b>{row.code}</b>,
    },
    {
      key: "code",
      title: "عملیات",
      render: (row) => {
        const handleOpenDelete = () => {
          setSelectedProduct(row);
          setDeleteOpen(true);
        };
        return (
          <>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Btn
                icon={<DeleteOutlineIcon />}
                onClick={handleOpenDelete}
                variant="outlined"
                color="error"
                title="حذف"
              />
            </Box>
            <DeleteConfirmDialog
              open={deleteOpen}
              title="حذف بنر"
              description={`آیا از حذف "${selectedProduct?.name}" مطمئن هستید؟`}
              onClose={handleCloseDelete}
              onConfirm={handleDeleteProduct}
            />
          </>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 2,
        marginY: 2,
      }}
    >
      <Box
        marginBottom={2}
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Btn
          icon={<AddIcon />}
          title="افزودن "
          variant="contained"
          onClick={() => setShowAddNewProduct(true)}
        />
      </Box>
      {/* {allNewProduct?.map((item, index) => {
          const imageUrl = StringHelpers.getProfile(
            item.attachments[0],
            item?.code
          );

          return (
            <Card
              key={item.id || index}
              sx={{
                m: 1,
                width: 140,
                position: "relative",
                overflow: "visible",
              }}
              variant="outlined"
            >
              <CardContent>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {item?.name}
                </Typography>

                {imageUrl && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <img
                      src={imageUrl}
                      width={80}
                      height={80}
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #e0e0e0",
                      }}
                      alt={item?.name || "تصویر محصول"}
                    />
                  </Box>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  مدل:
                  {item?.code}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Btn
                    variant="outlined"
                    color="error"
                    title="حذف"
                    fullWidth
                    icon={<DeleteOutlineIcon />}
                    onClick={() => handleOpenDelete(item)}
                  />
                </Box>
              </CardContent>
            </Card>
          );
        })} */}
      <Modal
        open={showAddNewProduct}
        onClose={() => setShowAddNewProduct(false)}
        title="افزودن محصول جدید"
        maxWidth="sm"
      >
        <AddNewProduct
          showAddNewProduct={showAddNewProduct}
          setShowAddNewProduct={setShowAddNewProduct}
        />
      </Modal>

      <BaseTable columns={columns} rows={allNewProduct || []} />
    </Box>
  );
};

export default NewProduct;
