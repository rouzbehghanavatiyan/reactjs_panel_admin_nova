import { Box, Card, CardContent } from "@mui/material";
import Btn from "../../components/Btn";
import AddIcon from "@mui/icons-material/Add";
import StringHelpers from "../../utils/StringHelper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { deletePopularProduct, getProductPopular } from "../../services";
import BaseTable, { BaseTableColumn } from "../../components/BaseTable";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Modal from "../../components/Modal";
import DeleteConfirmDialog from "../../components/DeleteModal";
import AddPopularProduct from "./AddPopularProduct";
import { useToast } from "../../components/Toastify";

const PopularProduct = () => {
  const toast = useToast();
  const [allPopularProduct, setAllPopularProduct] = useState([]);
  const [showPopularProduct, setShowPopularProduct] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await deletePopularProduct(selectedProduct?.productid);
      const { message, code } = res
      console.log(res);
      if (code === 0) {
        toast.success(message);
        setDeleteOpen(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("مشکلی در ارتباط با سرور رخ داد");
    }
  };

  const handleGetAllPopular = async () => {
    try {
      const res = await getProductPopular();
      setAllPopularProduct(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllPopular();
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
              <DeleteConfirmDialog
                open={deleteOpen}
                title="حذف بنر"
                description={`آیا از حذف "${selectedProduct?.name}" مطمئن هستید؟`}
                onClose={handleCloseDelete}
                onConfirm={handleDeleteProduct}
              />
            </Box>
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
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Btn
          icon={<AddIcon />}
          title="افزودن "
          variant="contained"
          onClick={() => setShowPopularProduct(true)}
        />
      </Box>
      <Modal
        open={showPopularProduct}
        onClose={() => setShowPopularProduct(false)}
        title="ویرایش"
        maxWidth="sm"
      >
        <AddPopularProduct
          productItem={undefined}
          showPopularProduct={showPopularProduct}
          setShowPopularProduct={setShowPopularProduct}
        />
      </Modal>
      <BaseTable columns={columns} rows={allPopularProduct || []} />
    </Box>
  );
};

export default PopularProduct;
