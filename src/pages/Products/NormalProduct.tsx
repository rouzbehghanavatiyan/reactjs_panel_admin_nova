import React, { useState } from "react";
import { Box } from "@mui/material";
import Btn from "../../components/Btn";
import AddIcon from "@mui/icons-material/Add";
import BaseTable, { BaseTableColumn } from "../../components/BaseTable";
import StringHelpers from "../../utils/StringHelper";
import Modal from "../../components/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import DeleteConfirmDialog from "../../components/DeleteModal";
import AddNormalProduct from "./AddNormalProduct";
import { deleteNormalProduct } from "../../services";
import { useToast } from "../../components/Toastify";

const NormalProduct: React.FC<any> = ({ allNormalProduct }) => {
  const toast = useToast();
  const [showNormalProduct, setShowNormalProduct] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productItem, setProductItem] = useState({});

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
            width={80}
            height={80}
            loading="lazy"
          />
        );
      },
    },
    // {
    //   key: "categoryTitle",
    //   title: "دسته",
    //   align: "center",
    // },
    // {
    //   key: "subcategoryTitle",
    //   title: "زیردسته",
    //   align: "center",
    // },
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
      key: "",
      title: "عملیات",
      render: (row) => {
        const handleDeleteProduct = async () => {
          try {
            const res = await deleteNormalProduct(selectedProduct.code);
            if (res?.code === 0) {
              toast.success("محصول با موفقیت حذف شد");
              setDeleteOpen(false);
            } else {
              toast.error("خطا در حذف محصول");
            }
          } catch (error) {
            console.error(error);
            toast.error("مشکلی در ارتباط با سرور رخ داد");
          }
        };
        const handleOpenDelete = () => {
          setSelectedProduct(row);
          setDeleteOpen(true);
        };

        const handleCloseDelete = () => {
          setDeleteOpen(false);
          setSelectedProduct(null);
        };

        const handleUpdateItem = () => {
          setProductItem(row);
          setShowNormalProduct(true);
        };

        return (
          <>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Btn
                icon={<SyncAltIcon />}
                onClick={handleUpdateItem}
                title="ویرایش"
                variant="outlined"
                color="primary"
              />
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

  const handleAddProduct = () => {
    setProductItem({});
    setShowNormalProduct(true);
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 2,
        marginY: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Btn
          icon={<AddIcon />}
          title="افزودن"
          variant="contained"
          onClick={handleAddProduct}
        />
      </Box>
      <Modal
        open={showNormalProduct}
        onClose={() => setShowNormalProduct(false)}
        title="محصول"
        maxWidth="lg"
      >
        <AddNormalProduct
          setProductItem={setProductItem}
          setShowNormalProduct={setShowNormalProduct}
          productItem={productItem}
        />
      </Modal>
      <BaseTable columns={columns} rows={allNormalProduct || []} />
    </Box>
  );
};

export default NormalProduct;
