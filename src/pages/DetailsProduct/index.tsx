import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { ComboBox } from "../../components/ComboBox";
import Modal from "../../components/Modal";
import BaseTable, { BaseTableColumn } from "../../components/BaseTable";
import {
  createDetailSubDetail,
  getAllDetails,
  getAllProduct,
  getAllSubDetails,
} from "../../services";
import DetailModal from "./DetailModal";
import SubDetailModal from "./SubDetailModal";

const DetailsProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [details, setDetails] = useState<any>({});
  const [subDetailes, setSubDetailes] = useState({});
  const [allDetailes, setAllDetailes] = useState([]);
  const [allSubDetailes, setAllSubDetailes] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSubDetailModal, setShowSubDetailModal] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [product, setProduct] = useState<any>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
  });

  const onSubmit = async () => {
    console.log(rows);
    const fixSubDetails = rows.map((item) => ({
      detailId: item?.details?.id,
      productId: item?.product?.id,
      subDetailes: item?.subDetailes?.map((item) => item?.id),
    }));
    console.log(fixSubDetails);
    const res = await createDetailSubDetail(fixSubDetails);
  };

  const handleAddRow = () => {
    // if (!product || !details) return;

    // const newRow = {
    //   id: Date.now(),
    //   product: product,
    //   details: details,
    //   subDetailes: subDetailes,
    // };

    // setRows((prev) => [...prev, newRow]);
    // setShowDetailModal(false);
  };

  const columns: BaseTableColumn<any>[] = [
    {
      key: "row",
      title: "ردیف",
      render: (_, index) => index + 1,
    },
    {
      key: "product",
      title: "محصول",
      render: (row) => row.product?.name,
    },
    {
      key: "details",
      title: "مشخصات",
      render: (row) => row.details?.title,
    },
    {
      key: "subDetailes",
      title: "زیرمشخصات",
      render: (row) =>
        row.subDetailes?.map((item: any) => item.title).join(" , "),
    },
    {
      key: "action",
      title: "عملیات",
      render: (row) => (
        <Button
          color="error"
          onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
        >
          حذف
        </Button>
      ),
    },
  ];

  const handleGetProducts = async () => {
    try {
      const resAllProduct = await getAllProduct();
      setAllProducts(resAllProduct?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDetails = async () => {
    try {
      const resAllProduct = await getAllDetails();
      setAllDetailes(resAllProduct?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllSubDetails = async () => {
    try {
      const resAllProduct = await getAllSubDetails();
      setAllSubDetailes(resAllProduct?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
    handleGetDetails();
    // handleGetAllSubDetails();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          sx={{
            p: 3,
            background: "#fff",
            borderRadius: 3,
            boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
          }}
        >
          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex={1} minWidth={250}>
              <ComboBox
                multiple
                label="زیرمشخصات"
                value={subDetailes}
                onChange={(e) => setSubDetailes(e)}
                options={allSubDetailes}
                optionLabel="title"
                optionValue="id"
              />
              <Box
                marginTop={1}
                display="flex"
                justifyContent={"start"}
                alignItems="start"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  onClick={() => setShowSubDetailModal(true)}
                >
                  ایجاد زیر مشخصه +
                </Button>
              </Box>
            </Box>
            <Box flex={1} minWidth={250}>
              <ComboBox
                disabled={details?.id ? true : false}
                label="مشخصات"
                value={details}
                onChange={(e) => setDetails(e)}
                options={allDetailes}
                optionLabel="title"
                optionValue="id"
              />
              <Box
                marginTop={1}
                display="flex"
                justifyContent={"start"}
                alignItems="start"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  onClick={() => setShowDetailModal(true)}
                >
                  ایجاد مشخصه +
                </Button>
              </Box>
            </Box>
            <Box flex={1} minWidth={250}>
              <ComboBox
                disabled={product?.id ? true : false}
                label="محصول"
                value={product}
                onChange={(e) => setProduct(e)}
                options={allProducts}
                optionLabel="name"
                optionValue="id"
              />
            </Box>
          </Box>
          <Box
            marginTop={1}
            display="flex"
            justifyContent={"end"}
            alignItems="start"
          >
            <Button
              type="submit"
              variant="contained"
              color="warning"
              onClick={() => handleAddRow()}
            >
              افزودن به جدول +
            </Button>
          </Box>
          <BaseTable isFilteredRows={false} columns={columns} rows={rows} />
          <Box display="flex" justifyContent="flex-start">
            <Button type="submit" variant="contained" color="success">
              ثبت نهایی
            </Button>
          </Box>
        </Box>
      </form>
      <Modal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="ایجاد مشخصه"
        maxWidth="sm"
      >
        <DetailModal handleSubmit={handleSubmit} control={control} />
      </Modal>
      <Modal
        open={showSubDetailModal}
        onClose={() => setShowSubDetailModal(false)}
        title="ایجادزیرمشخصه"
        maxWidth="sm"
      >
        <SubDetailModal
          details={details}
          handleSubmit={handleSubmit}
          control={control}
        />
      </Modal>
    </>
  );
};

export default DetailsProduct;
