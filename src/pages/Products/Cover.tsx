import { Box } from "@mui/material";
import Btn from "../../components/Btn";
import AddIcon from "@mui/icons-material/Add";
import StringHelpers from "../../utils/StringHelper";
import { useEffect, useState } from "react";
import { addAttachment, deleteCoverProduct, getAllCover } from "../../services";
import Modal from "../../components/Modal";
import AddCover from "./AddCover";
import { useToast } from "../../components/Toastify";
import DeleteConfirmDialog from "../../components/DeleteModal";
import BaseTable, { BaseTableColumn } from "../../components/BaseTable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Cover = () => {
  const toast = useToast();
  const [showAddCover, setShowAddCover] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [allCover, setAllCover] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async () => {
    console.log(selectedProduct);
    if (!selectedProduct?.id) {
      toast.error("محصول مورد نظر وجود ندارد");
      return;
    }
    try {
      const res = await deleteCoverProduct(selectedProduct.id);
      const { message, code } = res;
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

  const handleGetAllCover = async () => {
    try {
      const resCover = await getAllCover();
      setAllCover(resCover?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllCover();
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
      key: "title",
      title: "متن",
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
          onClick={() => setShowAddCover(true)}
        />
      </Box>
      <Modal
        open={showAddCover}
        onClose={() => setShowAddCover(false)}
        title="افزودن کاور جدید"
        maxWidth="lg"
      >
        <AddCover
          productItem={false}
          setShowAddCover={setShowAddCover}
          showAddCover={showAddCover}
        />
      </Modal>

      <BaseTable columns={columns} rows={allCover || []} />
    </Box>
  );
};

export default Cover;
